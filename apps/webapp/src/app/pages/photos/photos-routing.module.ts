import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemesComponent } from './memes.component';

const routes: Routes = [{ path: '', component: MemesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemesRoutingModule {}
