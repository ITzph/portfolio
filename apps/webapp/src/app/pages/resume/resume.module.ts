import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './resume.component';
import { SkillComponent } from './skill/skill.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import * as fromProfile from '../../reducers/profile.reducer';
import { StoreModule } from '@ngrx/store';
import { ExperienceComponent } from './experience/experience.component';

@NgModule({
  declarations: [ResumeComponent, SkillComponent, ExperienceComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
  exports: [ResumeComponent, SkillComponent, ExperienceComponent],
})
export class ResumeModule {}
