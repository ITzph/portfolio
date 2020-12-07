import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFilesRoutingModule } from './admin-files-routing.module';
import { AdminFilesComponent } from './admin-files.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [AdminFilesComponent, UploadFileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminFilesRoutingModule,
    NgxSpinnerModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
  ],
  providers: [DialogService],
  exports: [AdminFilesComponent, UploadFileComponent],
})
export class AdminFilesModule {}
