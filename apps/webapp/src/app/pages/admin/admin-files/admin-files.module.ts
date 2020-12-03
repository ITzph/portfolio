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
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

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
    TableModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [DialogService],
  exports: [UploadFileComponent],
})
export class AdminFilesModule {}
