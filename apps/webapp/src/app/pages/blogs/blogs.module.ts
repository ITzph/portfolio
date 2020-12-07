import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { LayoutModule } from '../../modules/layout/layout.module';
import { StoreModule } from '@ngrx/store';

import * as fromBlog from '../../reducers/blog.reducer';
import { UtilitiesModule } from '../../modules/utilities/utilities.module';
import { QuillModule } from 'ngx-quill';
import { FullBlogContentComponent } from './full-blog-content/full-blog-content.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogTileComponent } from './blog-tile/blog-tile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TagFilterComponent } from './tag-filter/tag-filter.component';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    BlogsComponent,
    FullBlogContentComponent,
    BlogListComponent,
    BlogTileComponent,
    TagFilterComponent,
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    HeaderModule,
    FooterModule,
    LayoutModule,
    UtilitiesModule,
    QuillModule.forRoot(),
    StoreModule.forFeature(fromBlog.blogsFeatureKey, fromBlog.reducer),
    NgxSpinnerModule,
    CardModule,
    TooltipModule,
  ],
  exports: [
    BlogsComponent,
    FullBlogContentComponent,
    BlogListComponent,
    BlogTileComponent,
    TagFilterComponent,
  ],
})
export class BlogsModule {}
