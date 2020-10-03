import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentNotFoundComponent } from '../not-found/content-not-found/content-not-found.component';

import { AdminComponent } from './admin.component';
import { AdminMemesComponent } from './memes/memes.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { AdminResumeComponent } from './resume/admin-resume/admin-resume.component';
import { AdminBlogsComponent } from './blogs/admin-blogs.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminMemesComponent, pathMatch: 'full' },
      { path: 'profile', component: AdminProfileComponent, pathMatch: 'full' },
      { path: 'blogs', component: AdminBlogsComponent, pathMatch: 'full' },
      { path: 'memes', component: AdminMemesComponent, pathMatch: 'full' },
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
