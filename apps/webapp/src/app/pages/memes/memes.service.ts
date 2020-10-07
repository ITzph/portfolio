import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take, catchError, withLatestFrom } from 'rxjs/operators';
import { Pagination } from '@portfolio/api-interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import * as fromMeme from '../../reducers/meme.reducer';
import { getMemes } from '../../selectors/meme.selectors';
import { addMeme, addMemes, deleteMeme, updateMeme } from '../../actions/meme.actions';

@Injectable({ providedIn: 'root' })
export class MemesService {
  private currentPage = 0;
  private readonly PAGE_SIZE_LIMIT = 20;

  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService,
    private readonly snackBar: MatSnackBar,
    private readonly memesStore: Store<fromMeme.State>,
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
        withLatestFrom(this.memesStore.pipe(select(getMemes))),
        take(1),
        finalize(() => {
          this.spinner.hide('memesSpinner');
        }),
      )
      .subscribe(([res, memes]) => {
        const currentMemes = memes;
        const updatedMemes = [...currentMemes, ...res.items];

        if (res.meta.totalItems > currentMemes.length) {
          this.memesStore.dispatch(addMemes({ memes: res.items }));
        }

        if (res.meta.totalItems < updatedMemes.length) {
          this.currentPage += 1;
        }
      });
  }

  public getMemes$() {
    return this.memesStore.pipe(select(getMemes));
  }

  public addMeme(meme: IImageMetadata) {
    this.memesStore.dispatch(addMeme({ meme }));
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
        this.memesStore.dispatch(
          updateMeme({
            meme: {
              id,
              changes: res,
            },
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
        this.memesStore.dispatch(deleteMeme({ id: res.id }));
      });
  }

  imageUpload(imageForm: FormData) {
    return this.http.post<IImageMetadata>(`${environment.api}/memes`, imageForm);
  }
}
