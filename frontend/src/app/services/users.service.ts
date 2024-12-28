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
}
