import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './resume.component';
import { SkillComponent } from './skill/skill.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import * as fromProfile from '../../reducers/profile.reducer';
import { StoreModule } from '@ngrx/store';
import { ExperienceComponent } from './experience/experience.component';
import { CertificationComponent } from './certification/certification.component';

@NgModule({
  declarations: [ResumeComponent, SkillComponent, ExperienceComponent, CertificationComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
  exports: [ResumeComponent, SkillComponent, ExperienceComponent, CertificationComponent],
})
export class ResumeModule {}
