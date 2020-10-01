import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactMeDetails } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private readonly http: HttpClient) {}

  sendContactMeMessage(message: ContactMeDetails) {
    return this.http.post<{ message: string; result: boolean }>(
      environment.api + '/email',
      message,
    );
  }
}
