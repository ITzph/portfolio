import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken = '';

    this.authService
      .getToken()
      .pipe(take(1))
      .subscribe((token) => (authToken = token));

    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });

    request = request.clone({ headers: request.headers.set('x-auth', 'random token') });

    return next.handle(request);
  }
}
