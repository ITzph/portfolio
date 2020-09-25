import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take, catchError } from 'rxjs/operators';
import { Pagination } from '@portfolio/api-interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MemesService {
  private currentPage = 0;
  private readonly PAGE_SIZE_LIMIT = 20;
  private memes = new BehaviorSubject<IImageMetadata[]>([]);

  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService,
    private readonly snackBar: MatSnackBar,
  ) {
    this.spinner.show('memesSpinner');

    this.fetchPaginatedMemes();
  }

  public fetchPaginatedMemes() {
    this.http
      .get<Pagination<IImageMetadata>>(
        `${environment.api}/memes?page=${this.currentPage}&limit=${this.PAGE_SIZE_LIMIT}&orderBy=createdAt.ASC`,
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

  public updateMeme(id: number, meme: Partial<IImageMetadata>) {
    this.spinner.show('memesSpinner');
    this.http
      .patch<Partial<IImageMetadata>>(`${environment.api}/memes/${id}`, meme)
      .pipe(
        finalize(() => {
          this.spinner.hide('memesSpinner');
        }),
        catchError((err) => {
          throw { message: err };
        }),
      )
      .subscribe((res) => {
        // TODO handle result properly, check why result was id
        this.memes.next(
          this.memes.getValue().map((_meme) => {
            if (id === _meme.id) {
              return {
                ..._meme,
                ...res,
              };
            }

            return _meme;
          }),
        );

        this.snackBar.open(`Updated ${meme.title} successfully`, 'success', {
          duration: 2000,
        });
      });
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
        this.snackBar.open(`Deleted ${meme.title} successfully`, 'success', {
          duration: 2000,
        });
      });
  }

  imageUpload(imageForm: FormData) {
    return this.http.post<IImageMetadata>(`${environment.api}/memes`, imageForm);
  }
}
