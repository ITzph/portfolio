import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminResumeRoutingModule } from './admin-resume-routing.module';
import { AdminResumeComponent } from './admin-resume.component';

@NgModule({
  declarations: [AdminResumeComponent],
  imports: [CommonModule, AdminResumeRoutingModule],
})
export class AdminResumeModule {}
