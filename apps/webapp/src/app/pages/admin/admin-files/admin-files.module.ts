import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFilesRoutingModule } from './admin-files-routing.module';
import { AdminFilesComponent } from './admin-files.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdminFilesComponent, UploadFileComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AdminFilesRoutingModule,
    MatDialogModule,
    MatButtonModule,
    NgxSpinnerModule,
  ],
  exports: [UploadFileComponent],
})
export class AdminFilesModule {}
