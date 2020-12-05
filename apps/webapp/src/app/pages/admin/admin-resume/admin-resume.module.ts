import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminResumeRoutingModule } from './admin-resume-routing.module';
import { AdminResumeComponent } from './admin-resume.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminExperienceComponent } from './experience/experience.component';
import { AdminCertificationComponent } from './certification/certification.component';
import { AdminSkillComponent } from './skill/skill.component';
import { UpdateExperienceComponent } from './experience/update-experience/update-experience.component';
import { UpdateSkillComponent } from './skill/update-skill/update-skill.component';
import { UpdateCertificationComponent } from './certification/update-certification/update-certification.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AdminResumeComponent,
    AdminExperienceComponent,
    AdminCertificationComponent,
    AdminSkillComponent,
    UpdateExperienceComponent,
    UpdateSkillComponent,
    UpdateCertificationComponent,
  ],
  imports: [
    CommonModule,
    AdminResumeRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextModule,
    ToggleButtonModule,
    CalendarModule,
    MatDialogModule,
  ],
  exports: [
    AdminResumeComponent,
    AdminExperienceComponent,
    AdminCertificationComponent,
    AdminSkillComponent,
    UpdateExperienceComponent,
    UpdateSkillComponent,
    UpdateCertificationComponent,
  ],
})
export class AdminResumeModule {}
