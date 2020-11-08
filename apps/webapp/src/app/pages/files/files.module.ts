import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesViewerComponent } from './files.component';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FileListComponent } from './file-list/file-list.component';

@NgModule({
  declarations: [FilesViewerComponent, FileListComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    LayoutModule,
    HeaderModule,
    FooterModule,
    MatCardModule,
    MatTableModule,
  ],
  exports: [FilesViewerComponent, FileListComponent],
})
export class FilesModule {}
