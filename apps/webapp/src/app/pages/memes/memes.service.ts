import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MemesService {
  private memes = new BehaviorSubject<IImageMetadata[]>([]);

  constructor(private readonly http: HttpClient, private readonly spinner: NgxSpinnerService) {
    this.spinner.show('memesSpinner');
    this.http
      .get<IImageMetadata[]>(`${environment.api}/memes`)
      .pipe(
        finalize(() => {
          this.spinner.hide('memesSpinner');
        }),
      )
      .subscribe((res) => {
        this.memes.next(res);
      });
  }

  public getMemes$() {
    return this.memes.asObservable();
  }

  public addMeme(meme: IImageMetadata) {
    this.memes.next([...this.memes.getValue(), meme]);
  }

  public deleteMeme(meme: IImageMetadata) {
    this.spinner.show('memesSpinner');
    this.http
      .delete<{ id: number }>(`${environment.api}/memes/${meme.id}`)
      .pipe(
        finalize(() => {
          this.spinner.hide('memesSpinner');
        }),
      )
      .subscribe((res) => {
        this.memes.next(this.memes.getValue().filter((_meme) => res.id !== _meme.id));
      });
  }

  imageUpload(imageForm: FormData) {
    return this.http.post<IImageMetadata>(`${environment.api}/memes`, imageForm);
  }
}
