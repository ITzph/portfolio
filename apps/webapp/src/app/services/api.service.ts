import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

import { IUser } from '@portfolio/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getProfile(): Observable<IUser> {
    return this.httpClient.get<IUser>(environment.api + '/profiles/me');
  }
}
