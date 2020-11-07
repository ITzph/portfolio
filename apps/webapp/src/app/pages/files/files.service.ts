import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFileMetadata } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private readonly http: HttpClient) {}

  getAllFiles() {
    return this.http.get<IFileMetadata[]>(environment.api + '/files');
  }
}
