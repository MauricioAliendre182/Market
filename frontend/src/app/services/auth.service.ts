import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { LoginUser, LoginAuth, User } from '../models/user.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.API_URL}/market/api`
  private token = ''

  // We need to store the state of our user (when this user is authenticated or not)
  // A problem that we could have here it is that the state of the user comes back to null
  // when the page is reloaded, this can be resolved in the app.component
  private user = new BehaviorSubject<User | null>(null);

  // Allow this 'user' that other components can subscribe to it
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(user: LoginUser) {
    return this.http.post<LoginAuth>(`${this.url}/user/login`, user, {observe: 'response'})
    .pipe(
      tap(response => {
        this.token = (response.body?.token as string)
        this.tokenService.saveToken(this.token)
      })
    )
  }

  getProfile() {
    const header = new HttpHeaders()
    .set('Token', `${this.tokenService.getToken()}`)
    return this.http.get<User>(`${this.url}/user/profile`, {headers: header})
    .pipe(
      // swithMap makes a change between observers
      // we do not need that, we only that this action can be executed one time
      // once we get the profile
      tap(user => this.user.next(user))
    );
  }

  loginAndGet(user: LoginUser) {
    return this.login(user)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  logout() {
    this.tokenService.removeToken();
    this.user.next(null);
  }
}
