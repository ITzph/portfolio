import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminResumeComponent } from './admin-resume.component';

const routes: Routes = [{ path: '', component: AdminResumeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminResumeRoutingModule {}
