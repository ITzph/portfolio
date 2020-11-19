import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { IImageMetadata, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { PhotosService } from '../../photos/photos.service';
import { environment } from '../../../../environments/environment';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoDialogComponent } from './add-photo-dialog/add-photo-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UpdatePhotoDialogComponent } from './update-photo-dialog/update-photo-dialog.component';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { PhotoFormData } from '../../../modules/photo/model/photo.model';

@Component({
  selector: 'portfolio-admin-photos',
  templateUrl: './admin-photos.component.html',
  styleUrls: ['./admin-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPhotosComponent implements OnInit {
  constructor(
    private readonly photosService: PhotosService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {}

  public get photos$() {
    return this.photosService.getPhotos$().pipe(
      map((photos) => {
        return photos.map(
          (photo): IImageMetadata => {
            return {
              ...photo,
              url: `${environment.api}/${API_ENDPOINTS.photos}/image/${photo.imageName}`,
            };
          },
        );
      }),
    );
  }

  public onAddNewPhoto() {
    const dialogRef = this.dialog.open(AddPhotoDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onImageUpload(result);
      }
    });
  }

  public onUpdatePhoto(photo: IImageMetadata) {
    const dialogRef = this.dialog.open(UpdatePhotoDialogComponent, {
      data: photo,
    });

    dialogRef.afterClosed().subscribe((image: Partial<IImageMetadata>) => {
      if (image) {
        this.photosService.updatePhoto(photo.id, image);
      }
    });
  }

  public photoTracker(index: number, photo: IImageMetadata) {
    return trackByIdOrIndex(index, photo);
  }

  public onDeletePhoto(photo: IImageMetadata) {
    const dialogProp = {
      title: 'Delete Photo',
      messages: [`Are you sure you want to delete ${photo.title}?`],
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.photosService.deletePhoto(photo);
      }
    });
  }

  private onImageUpload(formData: PhotoFormData) {
    const imageForm = new FormData();
    imageForm.append('image', formData.fileSource);
    imageForm.append('caption', formData.description);
    imageForm.append('title', formData.title);
    imageForm.append('tags', JSON.stringify(formData.tags));
    this.spinner.show('photosSpinner');
    this.photosService
      .imageUpload(imageForm)
      .pipe(
        finalize(() => {
          this.spinner.hide('photosSpinner');
        }),
      )
      .subscribe((res) => {
        this.photosService.addPhoto(res);
      });
  }
}
