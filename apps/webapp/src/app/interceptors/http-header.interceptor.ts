import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + 'whatever token'),
    });

    request = request.clone({ headers: request.headers.set('x-auth', 'random token') });

    return next.handle(request);
  }
}
