import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesViewerComponent } from './files.component';

const routes: Routes = [
  {
    path: '',
    component: FilesViewerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
