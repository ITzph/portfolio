import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBlogsComponent } from './admin-blogs.component';

const routes: Routes = [{ path: '', component: AdminBlogsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
