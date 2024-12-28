import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private cookieService: CookieService
  ) { }

  saveToken(token: string) {
    // localStorage.setItem("token", token)
    this.cookieService.deleteAll('/')
    this.cookieService.set("token", token)
  }

  getToken() {
    // const token = localStorage.getItem("token")
    const token = this.cookieService.get("token")
    return token
  }

  removeToken() {
    this.cookieService.delete("token", "/")
  }
}
