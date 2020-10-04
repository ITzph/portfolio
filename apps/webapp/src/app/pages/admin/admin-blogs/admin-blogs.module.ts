import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogsRoutingModule } from './admin-blogs-routing.module';
import { AdminBlogsComponent } from './admin-blogs.component';
import * as fromBlogs from '../../../reducers/blog.reducer';
import { PhotoModule } from '../../../modules/photo/photo.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AdminBlogsComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PhotoModule,
    QuillModule.forRoot(),
    StoreModule.forFeature(fromBlogs.blogsFeatureKey, fromBlogs.reducer),
    MatDialogModule,
  ],
})
export class AdminBlogsModule {}
