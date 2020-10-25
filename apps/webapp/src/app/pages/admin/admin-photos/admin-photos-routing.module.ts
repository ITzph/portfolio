import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMemesComponent } from './admin-memes.component';

const routes: Routes = [{ path: '', component: AdminMemesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMemesRoutingModule {}
