import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminResumeComponent } from './admin-resume.component';
import { AdminExperienceComponent } from './experience/experience.component';
import { AdminSkillComponent } from './skill/skill.component';
import { AdminCertificationComponent } from './certification/certification.component';

const routes: Routes = [
  {
    path: '',
    component: AdminResumeComponent,
    children: [
      {
        path: '',
        component: AdminSkillComponent,
      },
      {
        path: 'experiences',
        component: AdminExperienceComponent,
      },
      {
        path: 'certifications',
        component: AdminCertificationComponent,
      },
      {
        path: 'skills',
        component: AdminSkillComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminResumeRoutingModule {}
