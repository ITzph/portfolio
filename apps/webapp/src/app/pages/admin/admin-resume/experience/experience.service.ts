import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, select, Store } from '@ngrx/store';
import {
  ExperienceCategory,
  IUserExperience,
  PORTFOLIO_ENDPOINTS,
} from '@portfolio/api-interfaces';
import { getExperiences } from '../../../../selectors/profile.selectors';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { updateExperience } from '../../../../actions/profile.actions';
import { ResumeAdminServiceAbstract } from '../resume-admin-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService extends ResumeAdminServiceAbstract {
  elementType = PORTFOLIO_ENDPOINTS.experiences;

  getElements = this.profileStore.pipe(select(getExperiences));

  updateElementsDispatcher(elements: IUserExperience[]): Action {
    return updateExperience({
      experiences: elements,
    });
  }

  constructor(
    readonly profileStore: Store<fromProfile.State>,
    readonly snackbar: MatSnackBar,
    readonly http: HttpClient,
  ) {
    super(profileStore, snackbar, http);
  }

  updateElementOfList(experience: IUserExperience, experiences: IUserExperience[]) {
    return experiences.map((exp) => {
      const newExperience: IUserExperience = {
        id: experience.id,
        events: experience.events,
        endDate: experience?.endDate ?? exp.endDate,
        startDate: experience?.startDate ?? exp.startDate,
        name: experience?.name ?? exp.name,
        role: experience?.role ?? exp.role,
        category: ExperienceCategory.WORK,
        isActive: experience?.isActive ?? exp.isActive,
      };

      return exp.id === experience.id ? newExperience : exp;
    });
  }
}
