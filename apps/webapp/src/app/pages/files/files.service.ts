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
    return this.http.get<IFileMetadata[]>(`${environment.api}/files`);
  }

  getOneFile(key: string) {
    return this.http.get(`${environment.api}/files/${key}`, {
      responseType: 'arraybuffer' as 'json',
    });
  }

  getResume(fileType: 'pdf' | 'word') {
    return this.http.get(`${environment.api}/files/resume/download?fileType=${fileType}`, {
      responseType: 'arraybuffer' as 'json',
    });
  }
}
