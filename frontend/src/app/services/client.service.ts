import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';
import { catchError, map, retry, throwError } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = `${environment.API_URL}/market/api/clients`;
  constructor(private httpClient: HttpClient) {}

  createAClient(dto: Client) {
    return this.httpClient.post<Client>(`${this.url}/save`, dto);
  }

  getAllClients(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient
      .get<Client[]>(`${this.url}`, { params: params, context: checkTime() })
      .pipe(
        retry(2),
        map((clients) =>
          clients.map((client) => {
            return {
              ...client
            };
          })
        ),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError(() => 'Clients not found');
          }
          if (error.status === 403) {
            return throwError(() => 'The access is forbidden');
          }
          return throwError(() => 'Ups..something was wrong');
        })
    );
  }

  getAClientById(clientId: string) {
    return this.httpClient
      .get<Client>(`${this.url}/${clientId}`, { context: checkTime() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError(() => 'Server is failing');
          }
          if (error.status === 404) {
            return throwError(() => 'The client does not exist');
          }
          if (error.status === 403) {
            return throwError(() => 'The access for this client is forbidden');
          }
          return throwError(() => 'Ups..something was wrong');
        })
      );
  }

  deleteAClientById(clientId: string) {
    return this.httpClient
      .delete<void>(`${this.url}/delete/${clientId}`, { context: checkTime() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError(() => 'Server is failing');
          }
          if (error.status === 404) {
            return throwError(() => 'The client does not exist');
          }
          if (error.status === 403) {
            return throwError(() => 'The access for this client is forbidden');
          }
          return throwError(() => 'Ups..something was wrong');
        })
      );
  }

}
