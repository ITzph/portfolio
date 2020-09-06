import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = new BehaviorSubject<string>(null);

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  public getToken() {
    return this.authToken.asObservable();
  }

  private setToken(token: string) {
    this.authToken.next(token);
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.getToken().pipe(map((token) => !!token));
  }

  public login(username: string, password: string) {
    this.http
      .post<{ access_token: string }>(environment.api + '/auth/login', {
        username,
        password,
      })
      .subscribe((res) => {
        this.setToken(res.access_token);
        this.router.navigateByUrl('/');
      });
  }

  public logout() {
    this.setToken(null);
    this.router.navigateByUrl('/');
  }
}
