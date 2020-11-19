import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFileMetadata, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private readonly http: HttpClient) {}

  getAllFiles() {
    return this.http.get<IFileMetadata[]>(
      `${environment.api}/${API_ENDPOINTS.files}/${API_ENDPOINTS.all}`,
    );
  }

  getAllPublicFiles() {
    return this.http.get<IFileMetadata[]>(`${environment.api}/${API_ENDPOINTS.files}`);
  }

  getOneFile(key: string) {
    return this.http.get(`${environment.api}/${API_ENDPOINTS.files}/${key}`, {
      responseType: 'arraybuffer' as 'json',
    });
  }

  updateFile(id: number, file: IFileMetadata) {
    return this.http.patch<IFileMetadata>(`${environment.api}/${API_ENDPOINTS.files}/${id}`, file);
  }

  deleteFile(id: number) {
    return this.http.delete<{ id: number }>(`${environment.api}/${API_ENDPOINTS.files}/${id}`);
  }

  fileUpload(fileFormData: FormData) {
    return this.http.post<IFileMetadata>(`${environment.api}/${API_ENDPOINTS.files}`, fileFormData);
  }

  getResume(fileType: 'pdf' | 'word') {
    return this.http.get(
      `${environment.api}/${API_ENDPOINTS.files}/${API_ENDPOINTS.resume}/${API_ENDPOINTS.download}?fileType=${fileType}`,
      {
        responseType: 'arraybuffer' as 'json',
      },
    );
  }
}
