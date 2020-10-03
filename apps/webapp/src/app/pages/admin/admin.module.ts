import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminMemesComponent } from './memes/memes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddMemeDialogComponent } from './memes/add-meme-dialog/add-meme-dialog.component';
import { UpdateMemeDialogComponent } from './memes/update-meme-dialog/update-meme-dialog.component';
import { PhotoModule } from '../../modules/photo/photo.module';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderModule } from '../../modules/header/header.module';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { AdminResumeComponent } from './resume/admin-resume/admin-resume.component';
import { NotFoundModule } from '../not-found/not-found.module';
import { AdminBlogsComponent } from './blogs/admin-blogs.component';
import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import * as fromBlogs from '../../reducers/blogs.reducer';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMemesComponent,
    AddMemeDialogComponent,
    UpdateMemeDialogComponent,
    AdminProfileComponent,
    AdminResumeComponent,
    AdminBlogsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    PhotoModule,
    MatChipsModule,
    HeaderModule,
    NotFoundModule,
    // TODO extract to submodule
    QuillModule.forRoot(),
    StoreModule.forFeature(fromBlogs.blogsFeatureKey, fromBlogs.reducer),
  ],
  exports: [
    AdminComponent,
    AdminMemesComponent,
    AddMemeDialogComponent,
    UpdateMemeDialogComponent,
    AdminProfileComponent,
    AdminResumeComponent,
    AdminBlogsComponent,
  ],
})
export class AdminModule {}
