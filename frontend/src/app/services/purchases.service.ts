import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { CreatePurchaseDTO, Purchase } from '../models/purchase.model';
import { checkTime } from '../interceptors/time.interceptor';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private url = `${environment.API_URL}/market/api/purchases`;
  constructor(private httpClient: HttpClient) {}

  createAPurchase(dto: CreatePurchaseDTO) {
    return this.httpClient.post<Purchase>(`${this.url}/save`, dto);
  }

  getAllProducts(limit?: number, offset?: number) {
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

  getAPurchaseByUser(userId: string) {
    return this.httpClient
      .get<Purchase>(`${this.url}/client/${userId}`, { context: checkTime() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError(() => 'Server is failing');
          }
          if (error.status === 404) {
            return throwError(() => 'The purchases associated to this user do not exist');
          }
          if (error.status === 403) {
            return throwError(() => 'The access for this user is forbidden');
          }
          return throwError(() => 'Ups..something was wrong');
        })
      );
  }
}
