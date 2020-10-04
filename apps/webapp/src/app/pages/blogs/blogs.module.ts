import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { LayoutModule } from '../../modules/layout/layout.module';
import { StoreModule } from '@ngrx/store';

import * as fromBlog from '../../reducers/blog.reducer';

@NgModule({
  declarations: [BlogsComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    HeaderModule,
    FooterModule,
    LayoutModule,
    StoreModule.forFeature(fromBlog.blogsFeatureKey, fromBlog.reducer),
  ],
  exports: [BlogsComponent],
})
export class BlogsModule {}
