import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IImageMetadata, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take, catchError, withLatestFrom } from 'rxjs/operators';
import { Pagination } from '@portfolio/api-interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import * as fromPhoto from '../../reducers/photo.reducer';
import { getPhotos } from '../../selectors/photo.selectors';
import { addPhoto, addPhotos, deletePhoto, updatePhoto } from '../../actions/photo.actions';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private currentPage = 0;
  private readonly PAGE_SIZE_LIMIT = 20;

  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService,
    private readonly snackBar: MatSnackBar,
    private readonly photosStore: Store<fromPhoto.State>,
  ) {
    this.spinner.show('photosSpinner');

    this.fetchPaginatedPhotos();
  }

  public fetchPaginatedPhotos() {
    this.http
      .get<Pagination<IImageMetadata>>(
        `${environment.api}/${API_ENDPOINTS.photos}?page=${this.currentPage}&limit=${this.PAGE_SIZE_LIMIT}&orderBy=createdAt.ASC`,
      )
      .pipe(
        withLatestFrom(this.photosStore.pipe(select(getPhotos))),
        take(1),
        finalize(() => {
          this.spinner.hide('photosSpinner');
        }),
      )
      .subscribe(([res, photos]) => {
        const currentPhotos = photos;
        const updatedPhotos = [...currentPhotos, ...res.items];

        if (res.meta.totalItems > currentPhotos.length) {
          this.photosStore.dispatch(addPhotos({ photos: res.items }));
        }

        if (res.meta.totalItems < updatedPhotos.length) {
          this.currentPage += 1;
        }
      });
  }

  public getPhotos$() {
    return this.photosStore.pipe(select(getPhotos));
  }

  public addPhoto(photo: IImageMetadata) {
    this.photosStore.dispatch(addPhoto({ photo }));
  }

  public updatePhoto(id: number, photo: Partial<IImageMetadata>) {
    this.spinner.show('photosSpinner');
    this.http
      .patch<Partial<IImageMetadata>>(`${environment.api}/${API_ENDPOINTS.photos}/${id}`, photo)
      .pipe(
        finalize(() => {
          this.spinner.hide('photosSpinner');
        }),
        catchError((err) => {
          throw { message: err };
        }),
      )
      .subscribe((res) => {
        // TODO handle result properly, check why result was id
        this.photosStore.dispatch(
          updatePhoto({
            photo: {
              id,
              changes: res,
            },
          }),
        );

        this.snackBar.open(`Updated ${photo.title} successfully`, 'success', {
          duration: 2000,
        });
      });
  }

  public deletePhoto(photo: IImageMetadata) {
    this.spinner.show('photosSpinner');
    this.http
      .delete<{ id: number }>(`${environment.api}/${API_ENDPOINTS.photos}/${photo.id}`)
      .pipe(
        finalize(() => {
          this.spinner.hide('photosSpinner');
        }),
      )
      .subscribe((res) => {
        this.photosStore.dispatch(deletePhoto({ id: res.id }));
      });
  }

  imageUpload(imageForm: FormData) {
    return this.http.post<IImageMetadata>(`${environment.api}/photos`, imageForm);
  }
}
