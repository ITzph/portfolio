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
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateExperienceComponent } from './experience/update-experience/update-experience.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateSkillComponent } from './skill/update-skill/update-skill.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UpdateCertificationComponent } from './certification/update-certification/update-certification.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
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
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    CardModule,
    ButtonModule,
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
