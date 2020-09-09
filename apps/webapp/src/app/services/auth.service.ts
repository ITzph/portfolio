import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

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
        this.username.next(username);
        localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_TOKEN, res.access_token);
        localStorage.setItem(LOCAL_STORAGE_KEY.USERNAME, username);
        this.router.navigateByUrl('/');
      });
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
    this.router.navigateByUrl('/');
    localStorage.removeItem(LOCAL_STORAGE_KEY.USERNAME);
    localStorage.removeItem(LOCAL_STORAGE_KEY.AUTH_TOKEN);
    this.authToken.next(null);
    this.username.next(null);
  }
}
