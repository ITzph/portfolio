import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatChipsModule } from '@angular/material/chips';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterByTagComponent } from './filter-by-tag/filter-by-tag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PhotosListComponent,
    PhotoDetailComponent,
    EmptyListComponent,
    FilterByTagComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports: [PhotosListComponent, PhotoDetailComponent, EmptyListComponent, FilterByTagComponent],
})
export class PhotoModule {}
