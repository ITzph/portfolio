import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentNotFoundComponent } from '../not-found/content-not-found/content-not-found.component';

import { AdminComponent } from './admin.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { AdminResumeComponent } from './resume/admin-resume/admin-resume.component';

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
      { path: 'profile', component: AdminProfileComponent, pathMatch: 'full' },
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
      { path: 'resume', component: AdminResumeComponent, pathMatch: 'full' },
      { path: '**', component: ContentNotFoundComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
