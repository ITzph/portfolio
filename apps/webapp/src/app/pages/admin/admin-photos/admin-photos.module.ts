import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';

import { AdminMemesRoutingModule } from './admin-memes-routing.module';
import { AdminMemesComponent } from './admin-memes.component';
import * as fromMemes from '../../../reducers/meme.reducer';
import { PhotoModule } from '../../../modules/photo/photo.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { UpdateMemeDialogComponent } from './update-meme-dialog/update-meme-dialog.component';
import { AddMemeDialogComponent } from './add-meme-dialog/add-meme-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminMemesComponent, UpdateMemeDialogComponent, AddMemeDialogComponent],
  imports: [
    CommonModule,
    AdminMemesRoutingModule,
    MatIconModule,
    PhotoModule,
    MatDialogModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(fromMemes.memesFeatureKey, fromMemes.reducer),
  ],
  exports: [AdminMemesComponent, UpdateMemeDialogComponent, AddMemeDialogComponent],
})
export class AdminMemesModule {}
