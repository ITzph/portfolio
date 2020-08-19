import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs/operators';
import { Pagination } from '@portfolio/api-interfaces';

@Injectable({ providedIn: 'root' })
export class MemesService {
  private currentPage = 0;
  private readonly PAGE_SIZE_LIMIT = 5;
  private memes = new BehaviorSubject<IImageMetadata[]>([]);

  constructor(private readonly http: HttpClient, private readonly spinner: NgxSpinnerService) {
    this.spinner.show('memesSpinner');

    this.fetchPaginatedMemes();
  }

  public fetchPaginatedMemes() {
    this.http
      .get<Pagination<IImageMetadata>>(
        `${environment.api}/memes?page=${this.currentPage}&limit=${this.PAGE_SIZE_LIMIT}`,
      )
      .pipe(
        take(1),
        finalize(() => {
          this.spinner.hide('memesSpinner');
        }),
      )
      .subscribe((res) => {
        const currentMemes = this.memes.getValue();
        const updatedMemes = [...currentMemes, ...res.items];

        if (res.meta.totalItems > currentMemes.length) {
          this.memes.next(updatedMemes);
        }

        if (res.meta.totalItems < updatedMemes.length) {
          this.currentPage += 1;
        }
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
