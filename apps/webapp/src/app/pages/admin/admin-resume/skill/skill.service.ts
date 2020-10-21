import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { take, withLatestFrom } from 'rxjs/operators';
import { IUserSkill } from '@portfolio/api-interfaces';
import { updateSkills } from '../../../../actions/profile.actions';
import { getCurrentUser, getSkills } from '../../../../selectors/profile.selectors';
import { environment } from '../../../../../environments/environment';
import * as fromProfile from '../../../../reducers/profile.reducer';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    private readonly snackbar: MatSnackBar,
    private readonly http: HttpClient,
  ) {}

  addSkill(skill: IUserSkill) {
    this.profileStore.pipe(select(getCurrentUser), take(1)).subscribe((user) => {
      this.http
        .post<IUserSkill>(`${environment.api}/skill/${user.id}`, skill)
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

  deleteSkill(id: number) {
    this.http
      .delete<{ id: number }>(`${environment.api}/skill/${id}`)
      .pipe(withLatestFrom(this.profileStore.pipe(select(getSkills), take(1))))
      .subscribe(
        ([res, skills]) => {
          this.profileStore.dispatch(
            updateSkills({
              skills: skills.filter((exp) => exp.id !== res.id),
            }),
          );
          this.snackbar.open(`Deleted skill successfully`, 'success', {
            duration: 2000,
          });
        },
        () => {
          this.snackbar.open(`Delete skill fail`, 'error', {
            duration: 2000,
          });
        },
      );
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
