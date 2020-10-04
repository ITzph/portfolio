import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogsRoutingModule } from './admin-blogs-routing.module';
import { AdminBlogsComponent } from './admin-blogs.component';
import * as fromBlogs from '../../../reducers/blog.reducer';

@NgModule({
  declarations: [AdminBlogsComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    StoreModule.forFeature(fromBlogs.blogsFeatureKey, fromBlogs.reducer),
  ],
})
export class AdminBlogsModule {}
