import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes.component';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import * as fromProfile from '../../reducers/profile.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AddMemeDialogComponent } from './add-meme-dialog/add-meme-dialog.component';
import { CustomDialogModule } from '../../modules/custom-dialog/custom-dialog.module';
import { MemesListComponent } from './memes-list/memes-list.component';
import { MemeDetailComponent } from './meme-detail/meme-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [MemesComponent, AddMemeDialogComponent, MemesListComponent, MemeDetailComponent],
  imports: [
    CommonModule,
    MemesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CustomDialogModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    NgxSpinnerModule,
    NgxPaginationModule,
  ],
  exports: [MemesComponent, AddMemeDialogComponent, MemesListComponent, MemeDetailComponent],
})
export class MemesModule {}
