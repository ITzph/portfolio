import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes.component';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import * as fromProfile from '../../reducers/profile.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDialogModule } from '../../modules/custom-dialog/custom-dialog.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { PhotoModule } from '../../modules/photo/photo.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [MemesComponent],
  imports: [
    CommonModule,
    MemesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    CustomDialogModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    NgxSpinnerModule,
    LayoutModule,
    HeaderModule,
    FooterModule,
    PhotoModule,
    MatSnackBarModule,
  ],
  exports: [MemesComponent],
})
export class MemesModule {}
