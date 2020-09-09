import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MemesComponent } from './memes/memes.component';
import { MemesModule } from '../memes/memes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddMemeDialogComponent } from './memes/add-meme-dialog/add-meme-dialog.component';

@NgModule({
  declarations: [AdminComponent, MemesComponent, AddMemeDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MemesModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [AdminComponent, MemesComponent, AddMemeDialogComponent],
})
export class AdminModule {}
