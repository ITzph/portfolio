import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminResumeRoutingModule } from './admin-resume-routing.module';
import { AdminResumeComponent } from './admin-resume.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AdminExperienceComponent } from './experience/experience.component';
import { AdminCertificationComponent } from './certification/certification.component';
import { AdminSkillComponent } from './skill/skill.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AdminResumeComponent,
    AdminExperienceComponent,
    AdminCertificationComponent,
    AdminSkillComponent,
  ],
  imports: [
    CommonModule,
    AdminResumeRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminResumeComponent,
    AdminExperienceComponent,
    AdminCertificationComponent,
    AdminSkillComponent,
  ],
})
export class AdminResumeModule {}
