import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { CreatePurchaseDTO, Purchase } from '../models/purchase.model';
import { checkTime } from '../interceptors/time.interceptor';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = `${environment.API_URL}/market/api/purchases`;
  constructor(private httpClient: HttpClient) {}

  getAllClients(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient
      .get<Purchase[]>(`${this.url}/all`, { params: params, context: checkTime() })
      .pipe(
        retry(2),
        map((purchases) =>
          purchases.map((purchase) => {
            return {
              ...purchase
            };
          })
        ),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError(() => 'Not found');
          }
          if (error.status === 403) {
            return throwError(() => 'The access is forbidden');
          }
          return throwError(() => 'Ups..something was wrong');
        })
      );
  }

}
