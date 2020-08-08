import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { IUser } from '@portfolio/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getProfile(): Observable<IUser> {
    return this.httpClient
      .get<IUser>(environment.api + '/profiles/me')
      .pipe(catchError(this.handleError));
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
