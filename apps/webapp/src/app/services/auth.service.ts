import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AUTH_ENDPOINTS, PORTFOLIO_ENDPOINTS } from '@portfolio/api-interfaces';

enum LOCAL_STORAGE_KEY {
  AUTH_TOKEN = 'auth_token',
  USERNAME = 'username',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = new BehaviorSubject<string>(null);
  private username = new BehaviorSubject<string>(null);

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.initializeAuthCredentials();
  }

  public getToken() {
    return this.authToken.asObservable();
  }

  public checkIfAuthenticated() {
    return this.http.get<boolean>(
      `${environment.api}/${PORTFOLIO_ENDPOINTS.auth}/${AUTH_ENDPOINTS.check}`,
    );
  }

  private setToken(token: string) {
    this.authToken.next(token);
  }

  public hasAuthToken(): Observable<boolean> {
    return this.getToken().pipe(map((token) => !!token));
  }

  public login(username: string, password: string) {
    return this.http.post<{ access_token: string }>(
      `${environment.api}/${PORTFOLIO_ENDPOINTS.auth}/${AUTH_ENDPOINTS.login}`,
      {
        username,
        password,
      },
    );
  }

  public handleLoginSuccessful(username: string, accessToken: string) {
    this.setToken(accessToken);
    this.username.next(username);
    localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY.USERNAME, username);
    this.router.navigateByUrl('/');
  }

  public initializeAuthCredentials() {
    const authKey = localStorage.getItem(LOCAL_STORAGE_KEY.AUTH_TOKEN);
    const username = localStorage.getItem(LOCAL_STORAGE_KEY.USERNAME);

    if (authKey) {
      this.authToken.next(authKey);
    }

    if (username) {
      this.username.next(username);
    }
  }

  public logout() {
    this.setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY.USERNAME);
    localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_TOKEN);
    this.authToken.next(null);
    this.username.next(null);
    this.router.navigateByUrl('/');
  }
}
