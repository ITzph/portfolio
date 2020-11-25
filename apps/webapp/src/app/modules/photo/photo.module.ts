import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatChipsModule } from '@angular/material/chips';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { MatIconModule } from '@angular/material/icon';
import { GroupingModule } from '../grouping/grouping.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [PhotosListComponent, PhotoDetailComponent, EmptyListComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatChipsModule,
    MatIconModule,
    GroupingModule,
    MatButtonModule,
    MatTooltipModule,
    LazyLoadImageModule,
    ButtonModule,
  ],
  exports: [PhotosListComponent, PhotoDetailComponent, EmptyListComponent],
})
export class PhotoModule {}
