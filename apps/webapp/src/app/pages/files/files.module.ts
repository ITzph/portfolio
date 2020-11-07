import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesViewerComponent } from './files.component';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [FilesViewerComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    LayoutModule,
    HeaderModule,
    FooterModule,
    MatCardModule,
  ],
  exports: [FilesViewerComponent],
})
export class FilesModule {}
