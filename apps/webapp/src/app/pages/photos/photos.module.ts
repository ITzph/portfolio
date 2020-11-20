import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDialogModule } from '../../modules/custom-dialog/custom-dialog.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { PhotoModule } from '../../modules/photo/photo.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import * as fromProfile from '../../reducers/profile.reducer';
import * as fromPhoto from '../../reducers/photo.reducer';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    CustomDialogModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    StoreModule.forFeature(fromPhoto.photosFeatureKey, fromPhoto.reducer),
    NgxSpinnerModule,
    LayoutModule,
    HeaderModule,
    FooterModule,
    PhotoModule,
    MatSnackBarModule,
  ],
  exports: [PhotosComponent],
})
export class PhotosModule {}
