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
    return this.http.get<IFileMetadata[]>(`${environment.api}/files/all`);
  }

  getAllPublicFiles() {
    return this.http.get<IFileMetadata[]>(`${environment.api}/files`);
  }

  getOneFile(key: string) {
    return this.http.get(`${environment.api}/files/${key}`, {
      responseType: 'arraybuffer' as 'json',
    });
  }

  updateFile(id: number, file: IFileMetadata) {
    return this.http.patch<IFileMetadata>(`${environment.api}/files/${id}`, file);
  }

  deleteFile(id: number) {
    return this.http.delete<{ id: number }>(`${environment.api}/files/${id}`);
  }

  fileUpload(fileFormData: FormData) {
    return this.http.post<IFileMetadata>(`${environment.api}/files`, fileFormData);
  }

  getResume(fileType: 'pdf' | 'word') {
    return this.http.get(`${environment.api}/files/resume/download?fileType=${fileType}`, {
      responseType: 'arraybuffer' as 'json',
    });
  }
}
