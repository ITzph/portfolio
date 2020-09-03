import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = new BehaviorSubject<string>(null);

  constructor() {}

  public getToken() {
    return this.authToken.asObservable();
  }

  public setToken(token: string) {
    this.authToken.next(token);
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.getToken().pipe(map((token) => !!token));
  }

  public logout() {
    this.setToken(null);
  }
}
