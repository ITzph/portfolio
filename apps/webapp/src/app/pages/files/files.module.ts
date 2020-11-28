import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesViewerComponent } from './files.component';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { FileListComponent } from './file-list/file-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [FilesViewerComponent, FileListComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    LayoutModule,
    HeaderModule,
    FooterModule,
    CardModule,
    ButtonModule,
    TableModule,
  ],
  exports: [FilesViewerComponent, FileListComponent],
})
export class FilesModule {}
