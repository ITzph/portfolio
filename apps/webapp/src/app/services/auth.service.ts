import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
      .post<{ userName: string; userId: string; token: string }>(environment.api + '/auth/login', {
        username,
        password,
      })
      .subscribe((res) => {
        this.setToken(res.token);
        this.router.navigateByUrl('/');
      });
  }

  public logout() {
    this.setToken(null);
  }
}
