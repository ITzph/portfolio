import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesViewerComponent } from './files.component';

@NgModule({
  declarations: [FilesViewerComponent],
  imports: [CommonModule, FilesRoutingModule],
  exports: [FilesViewerComponent],
})
export class FilesModule {}
