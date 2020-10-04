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

@NgModule({
  declarations: [BlogsComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    HeaderModule,
    FooterModule,
    LayoutModule,
    MatCardModule,
    UtilitiesModule,
    MatChipsModule,
    StoreModule.forFeature(fromBlog.blogsFeatureKey, fromBlog.reducer),
  ],
  exports: [BlogsComponent],
})
export class BlogsModule {}