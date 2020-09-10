import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminMemesComponent } from './memes/memes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddMemeDialogComponent } from './memes/add-meme-dialog/add-meme-dialog.component';
import { UpdateMemeDialogComponent } from './memes/update-meme-dialog/update-meme-dialog.component';
import { PhotoModule } from '../../modules/photo/photo.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMemesComponent,
    AddMemeDialogComponent,
    UpdateMemeDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    PhotoModule,
  ],
  exports: [AdminComponent, AdminMemesComponent, AddMemeDialogComponent, UpdateMemeDialogComponent],
})
export class AdminModule {}
