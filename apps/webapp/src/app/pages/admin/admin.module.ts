import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderModule } from '../../modules/header/header.module';
import { NotFoundModule } from '../not-found/not-found.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, HeaderModule, NotFoundModule],
  exports: [AdminComponent],
})
export class AdminModule {}
