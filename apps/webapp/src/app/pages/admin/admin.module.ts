import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderModule } from '../../modules/header/header.module';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { AdminResumeComponent } from './resume/admin-resume/admin-resume.component';
import { NotFoundModule } from '../not-found/not-found.module';

@NgModule({
  declarations: [AdminComponent, AdminProfileComponent, AdminResumeComponent],
  imports: [CommonModule, AdminRoutingModule, HeaderModule, NotFoundModule],
  exports: [AdminComponent, AdminProfileComponent, AdminResumeComponent],
})
export class AdminModule {}
