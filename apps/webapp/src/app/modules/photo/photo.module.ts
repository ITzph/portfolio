import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { GroupingModule } from '../grouping/grouping.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [PhotosListComponent, PhotoDetailComponent, EmptyListComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    GroupingModule,
    TooltipModule,
    LazyLoadImageModule,
    ButtonModule,
  ],
  exports: [PhotosListComponent, PhotoDetailComponent, EmptyListComponent],
})
export class PhotoModule {}
