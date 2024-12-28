import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const CHECK_TYPE = new HttpContextToken<boolean>(()=>false)

export function checkTime() {
  return new HttpContext().set(CHECK_TYPE, true)
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TYPE)){
      const start = performance.now()
      return next.handle(request)
      .pipe(
        // Tap leave us run a process without modifying the response that the observables just sent
        tap(() => {
          const time = (performance.now() - start) + "ms"
          console.log(request.url, time)
        })
      );
    }
    return next.handle(request);
  }
}
