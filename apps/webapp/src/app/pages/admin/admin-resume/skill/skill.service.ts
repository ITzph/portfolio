import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { take, withLatestFrom } from 'rxjs/operators';
import { IUserSkill } from '@portfolio/api-interfaces';
import { updateSkills } from '../../../../actions/profile.actions';
import { getSkills } from '../../../../selectors/profile.selectors';
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

  updateSkills(id: number, experience: Partial<IUserSkill>, cb?: Function) {
    this.http
      .patch<IUserSkill>(`${environment.api}/skill/${id}`, experience)
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
