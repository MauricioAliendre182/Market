import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { User, CreateUserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${environment.API_URL}/market/api`
  constructor(
    private http: HttpClient
  ) { }

  createAdmin(dto: CreateUserDTO) {
    return this.http.post<User>(`${this.url}/user/signup/admin`, dto)
  }

  createCustomer(dto: CreateUserDTO) {
    return this.http.post<User>(`${this.url}/user/signup/customer`, dto)
  }

  getAUserById(userId: string) {
    return this.http.get<User>(`${this.url}/user/id/${userId}`)
  }

  getAUserByUsername(username: string) {
    return this.http.get<User>(`${this.url}/user/username/${username}`)
  }

  deleteAUser(userId: string) {
    return this.http.delete<User>(`${this.url}/user/delete/${userId}`)
  }
}
