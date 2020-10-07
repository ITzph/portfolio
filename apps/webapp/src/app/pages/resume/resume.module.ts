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
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { UtilitiesModule } from '../../modules/utilities/utilities.module';

@NgModule({
  declarations: [ResumeComponent, SkillComponent, ExperienceComponent, CertificationComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    LayoutModule,
    HeaderModule,
    FooterModule,
    UtilitiesModule,
  ],
  exports: [ResumeComponent, SkillComponent, ExperienceComponent, CertificationComponent],
})
export class ResumeModule {}
