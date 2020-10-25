import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPhotosComponent } from './admin-photos.component';

const routes: Routes = [{ path: '', component: AdminPhotosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPhotosRoutingModule {}
