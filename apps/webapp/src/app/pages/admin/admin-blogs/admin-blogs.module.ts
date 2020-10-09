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
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BlogsModule } from '../../blogs/blogs.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UpdateBlogComponent } from './update-blog/update-blog.component';

@NgModule({
  declarations: [AdminBlogsComponent, CreateBlogComponent, UpdateBlogComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PhotoModule,
    MatInputModule,
    MatCardModule,
    QuillModule.forRoot(),
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    StoreModule.forFeature(fromBlogs.blogsFeatureKey, fromBlogs.reducer),
    MatDialogModule,
    BlogsModule,
    NgxSpinnerModule,
  ],
  exports: [AdminBlogsComponent, CreateBlogComponent, UpdateBlogComponent],
})
export class AdminBlogsModule {}
