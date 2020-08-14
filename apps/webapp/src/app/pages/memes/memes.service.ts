import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IImageMetadata } from '@portfolio/api-interfaces';

@Injectable({ providedIn: 'root' })
export class MemesService {
  private memes = new BehaviorSubject<IImageMetadata[]>([]);

  constructor(private readonly http: HttpClient) {
    this.http.get<IImageMetadata[]>('api/memes').subscribe((res) => {
      this.memes.next(res);
    });
  }

  public getMemes$() {
    return this.memes.asObservable();
  }

  public addMeme(meme: IImageMetadata) {
    this.memes.next([...this.memes.getValue(), meme]);
  }

  imageUpload(imageForm: FormData) {
    return this.http.post<IImageMetadata>('api/memes', imageForm);
  }
}
