import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentNotFoundComponent } from '../not-found/content-not-found/content-not-found.component';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin-memes/admin-memes.module').then((m) => m.AdminMemesModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./admin-profile/admin-profile.module').then((m) => m.AdminProfileModule),
      },
      {
        path: 'resume',
        loadChildren: () =>
          import('./admin-resume/admin-resume.module').then((m) => m.AdminResumeModule),
      },
      {
        path: 'memes',
        loadChildren: () =>
          import('./admin-memes/admin-memes.module').then((m) => m.AdminMemesModule),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('./admin-blogs/admin-blogs.module').then((m) => m.AdminBlogsModule),
      },
      { path: '**', component: ContentNotFoundComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
