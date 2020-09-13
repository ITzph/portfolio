import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [PhotosListComponent, PhotoDetailComponent],
  imports: [CommonModule, NgxPaginationModule, MatChipsModule],
  exports: [PhotosListComponent, PhotoDetailComponent],
})
export class PhotoModule {}
