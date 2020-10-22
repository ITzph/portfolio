import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { take, withLatestFrom } from 'rxjs/operators';
import { IUserSkill, PORTFOLIO_ENDPOINTS } from '@portfolio/api-interfaces';
import { updateSkills } from '../../../../actions/profile.actions';
import { getCurrentUser, getSkills } from '../../../../selectors/profile.selectors';
import { environment } from '../../../../../environments/environment';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { ResumeAdminServiceAbstract } from '../resume-admin-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class SkillService extends ResumeAdminServiceAbstract {
  elementType = PORTFOLIO_ENDPOINTS.skills;

  getElements = this.profileStore.pipe(select(getSkills));

  constructor(
    readonly profileStore: Store<fromProfile.State>,
    readonly snackbar: MatSnackBar,
    readonly http: HttpClient,
  ) {
    super(profileStore, snackbar, http);
  }

  addSkill(skill: IUserSkill) {
    this.profileStore.pipe(select(getCurrentUser), take(1)).subscribe((user) => {
      this.http
        .post<IUserSkill>(`${environment.api}/${PORTFOLIO_ENDPOINTS.skills}/${user.id}`, skill)
        .pipe(withLatestFrom(this.profileStore.pipe(select(getSkills))), take(1))
        .subscribe(
          ([addedSkill, skills]) => {
            this.profileStore.dispatch(
              updateSkills({
                skills: [addedSkill, ...skills],
              }),
            );

            this.snackbar.open(`Created skill ${addedSkill.name} successfully`, 'success', {
              duration: 2000,
            });
          },
          () => {
            this.snackbar.open(`Adding skill fail`, 'error', {
              duration: 2000,
            });
          },
        );
    });
  }

  updateElements(elements: IUserSkill[]) {
    return updateSkills({
      skills: elements,
    });
  }

  updateSkills(id: number, skill: Partial<IUserSkill>, cb?: Function) {
    this.http
      .patch<IUserSkill>(`${environment.api}/skill/${id}`, skill)
      .pipe(withLatestFrom(this.profileStore.pipe(select(getSkills))), take(1))
      .subscribe(
        ([updatedSkill, experiences]) => {
          this.profileStore.dispatch(
            updateSkills({
              skills: experiences.map((exp) => {
                const newSkill: IUserSkill = {
                  id: updatedSkill.id,
                  category: updatedSkill.category,
                  isCurrent: updatedSkill.isCurrent,
                  name: updatedSkill.name,
                };

                return exp.id === updatedSkill.id ? newSkill : exp;
              }),
            }),
          );

          if (cb) {
            cb();
          }
        },
        () => {
          this.snackbar.open(`Update experience fail`, 'error', {
            duration: 2000,
          });
        },
      );
  }
}
