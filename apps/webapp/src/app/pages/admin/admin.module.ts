import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MemesComponent } from './memes/memes.component';
import { MemesModule } from '../memes/memes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminComponent, MemesComponent],
  imports: [CommonModule, AdminRoutingModule, MemesModule, MatIconModule, MatButtonModule],
  exports: [AdminComponent, MemesComponent],
})
export class AdminModule {}
