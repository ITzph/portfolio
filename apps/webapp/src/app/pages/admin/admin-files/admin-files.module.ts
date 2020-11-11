import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFilesRoutingModule } from './admin-files-routing.module';
import { AdminFilesComponent } from './admin-files.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AdminFilesComponent],
  imports: [CommonModule, MatTableModule, MatIconModule, AdminFilesRoutingModule],
})
export class AdminFilesModule {}
