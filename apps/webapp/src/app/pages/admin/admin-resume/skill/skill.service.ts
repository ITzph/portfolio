import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { IUserSkill, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { updateSkills } from '../../../../actions/profile.actions';
import { getSkills } from '../../../../selectors/profile.selectors';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { ResumeAdminServiceAbstract } from '../resume-admin-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class SkillService extends ResumeAdminServiceAbstract {
  elementType = API_ENDPOINTS.skills;

  getElements = this.profileStore.pipe(select(getSkills));

  constructor(
    readonly profileStore: Store<fromProfile.State>,
    readonly snackbar: MatSnackBar,
    readonly http: HttpClient,
  ) {
    super(profileStore, snackbar, http);
  }

  updateElementsDispatcher(elements: IUserSkill[]) {
    return updateSkills({
      skills: elements,
    });
  }

  updateElementOfList(updatedSkill: IUserSkill, skills: IUserSkill[]) {
    return skills.map((exp) => {
      const newSkill: IUserSkill = {
        id: updatedSkill.id,
        category: updatedSkill.category,
        isCurrent: updatedSkill.isCurrent,
        name: updatedSkill.name,
      };

      return exp.id === updatedSkill.id ? newSkill : exp;
    });
  }
}
