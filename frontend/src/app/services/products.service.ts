import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = `${environment.API_URL}/market/api/products`;
  constructor(private httpClient: HttpClient) {}

  getProductByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient
      .get<Product[]>(`${this.url}/category/${categoryId}`, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError(() => 'Products not found');
          }
          if (error.status === 403) {
            return throwError(() => 'The access is forbidden');
          }
          return throwError(() => 'Ups..something was wrong');
        })
      );
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient
      .get<Product[]>(this.url, { params: params, context: checkTime() })
      .pipe(
        retry(2),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: item.price > 0 ? 0.19 * item.price : 0,
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

  getProductByPage(limit: number, offset: number) {
    return this.httpClient.get<Product[]>(this.url, {
      params: { limit, offset },
    });
  }

  getProduct(id: number | string) {
    return this.httpClient
      .get<Product>(`${this.url}/${id}`, { context: checkTime() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError(() => 'Server is failing');
          }
          if (error.status === 404) {
            return throwError(() => 'The product does not exist');
          }
          if (error.status === 403) {
            return throwError(() => 'The access is forbidden');
          }
          return throwError(() => 'Ups..something was wrong');
        })
      );
  }

  createProduct(dto: CreateProductDTO) {
    return this.httpClient.post<Product>(`${this.url}/save`, dto);
  }

  updateProduct(dto: UpdateProductDTO, id: number) {
    return this.httpClient.put<Product>(`${this.url}/update/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.url}/delete/${id}`);
  }

  fetchReadAndUpdate(id: number, dto: UpdateProductDTO) {
    return zip(this.getProduct(id), this.updateProduct(dto, id));
  }

  fetchFirstReadAndLastlyUpdate(id: number, dto: UpdateProductDTO) {
    return this.getProduct(id).pipe(
      switchMap((product) => {
        return this.updateProduct(dto, product.productId);
      })
    );
  }
}
