import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';

import { AdminPhotosRoutingModule } from './admin-photos-routing.module';
import { AdminPhotosComponent } from './admin-photos.component';
import * as fromPhotos from '../../../reducers/photo.reducer';
import { PhotoModule } from '../../../modules/photo/photo.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { UpdatePhotoDialogComponent } from './update-photo-dialog/update-photo-dialog.component';
import { AddPhotoDialogComponent } from './add-photo-dialog/add-photo-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminPhotosComponent, UpdatePhotoDialogComponent, AddPhotoDialogComponent],
  imports: [
    CommonModule,
    AdminPhotosRoutingModule,
    MatIconModule,
    PhotoModule,
    MatDialogModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromPhotos.photosFeatureKey, fromPhotos.reducer),
  ],
  exports: [AdminPhotosComponent, UpdatePhotoDialogComponent, AddPhotoDialogComponent],
})
export class AdminPhotosModule {}
