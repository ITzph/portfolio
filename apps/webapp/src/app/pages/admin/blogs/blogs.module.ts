import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import * as fromBlogs from '../../../reducers/blog.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlogsComponent],
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
