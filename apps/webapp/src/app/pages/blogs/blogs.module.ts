import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { LayoutModule } from '../../modules/layout/layout.module';
import { StoreModule } from '@ngrx/store';

import * as fromBlog from '../../reducers/blog.reducer';
import { MatCardModule } from '@angular/material/card';
import { UtilitiesModule } from '../../modules/utilities/utilities.module';
import { MatChipsModule } from '@angular/material/chips';
import { QuillModule } from 'ngx-quill';
import { FullBlogContentComponent } from './full-blog-content/full-blog-content.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { MatIconModule } from '@angular/material/icon';
import { BlogTileComponent } from './blog-tile/blog-tile.component';

@NgModule({
  declarations: [BlogsComponent, FullBlogContentComponent, BlogListComponent, BlogTileComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    HeaderModule,
    FooterModule,
    LayoutModule,
    MatCardModule,
    UtilitiesModule,
    MatChipsModule,
    QuillModule.forRoot(),
    StoreModule.forFeature(fromBlog.blogsFeatureKey, fromBlog.reducer),
    MatIconModule,
  ],
  exports: [BlogsComponent, FullBlogContentComponent, BlogListComponent, BlogTileComponent],
})
export class BlogsModule {}
