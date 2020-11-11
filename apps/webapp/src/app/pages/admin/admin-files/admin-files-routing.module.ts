import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFilesComponent } from './admin-files.component';

const routes: Routes = [{ path: '', component: AdminFilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFilesRoutingModule {}
