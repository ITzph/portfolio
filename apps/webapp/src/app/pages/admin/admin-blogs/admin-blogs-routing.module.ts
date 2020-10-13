import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBlogsComponent } from './admin-blogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ListBlogsComponent } from './list-blogs/list-blogs.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';

const routes: Routes = [
  {
    path: '',
    component: AdminBlogsComponent,
    children: [
      {
        path: '',
        component: ListBlogsComponent,
      },
      {
        path: 'list',
        component: ListBlogsComponent,
      },
      {
        path: 'create',
        component: CreateBlogComponent,
      },
      {
        path: 'update/:id',
        component: UpdateBlogComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
