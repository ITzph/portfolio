import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatChipsModule } from '@angular/material/chips';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PhotosListComponent, PhotoDetailComponent, EmptyListComponent],
  imports: [CommonModule, NgxPaginationModule, MatChipsModule, MatIconModule],
  exports: [PhotosListComponent, PhotoDetailComponent, EmptyListComponent],
})
export class PhotoModule {}
