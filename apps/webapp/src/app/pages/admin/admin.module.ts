import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MemesComponent } from './memes/memes.component';
import { MemesModule } from '../memes/memes.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AdminComponent, MemesComponent],
  imports: [CommonModule, AdminRoutingModule, MemesModule, MatIconModule],
  exports: [AdminComponent, MemesComponent],
})
export class AdminModule {}
