import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminMemesComponent } from './memes/memes.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { AdminResumeComponent } from './resume/admin-resume/admin-resume.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'profile', component: AdminProfileComponent, pathMatch: 'full' },
      { path: 'memes', component: AdminMemesComponent, pathMatch: 'full' },
      { path: 'resume', component: AdminResumeComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/admin/memes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
