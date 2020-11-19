import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getProfile(): Observable<IUser> {
    return this.httpClient.get<IUser>(
      `${environment.api}/${API_ENDPOINTS.profiles}/${API_ENDPOINTS.me}`,
    );
  }
}
