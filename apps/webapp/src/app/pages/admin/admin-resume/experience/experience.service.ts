import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { IUserExperience } from '@portfolio/api-interfaces';
import { getCurrentUser, getExperiences } from '../../../../selectors/profile.selectors';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { environment } from '../../../../../environments/environment';
import { take, withLatestFrom } from 'rxjs/operators';
import { updateExperience } from '../../../../actions/profile.actions';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    private readonly snackbar: MatSnackBar,
    private readonly http: HttpClient,
  ) {}

  updateExperience(id: number, experience: Partial<IUserExperience>, cb: Function) {
    this.http
      .patch<IUserExperience>(`${environment.api}/experience/${id}`, experience)
      .pipe(withLatestFrom(this.profileStore.pipe(select(getExperiences))), take(1))
      .subscribe(
        ([updatedExp, experiences]) => {
          this.profileStore.dispatch(
            updateExperience({
              experiences: experiences.map((exp) => {
                const newExperience: IUserExperience = {
                  id: updatedExp.id,
                  events: updatedExp.events,
                  endDate: updatedExp?.endDate ?? exp.endDate,
                  startDate: updatedExp?.startDate ?? exp.startDate,
                  name: updatedExp?.name ?? exp.name,
                  role: updatedExp?.role ?? exp.role,
                  isActive: updatedExp?.isActive ?? exp.isActive,
                };

                return exp.id === updatedExp.id ? newExperience : exp;
              }),
            }),
          );

          cb();
        },
        () => {
          this.snackbar.open(`Update experience fail`, 'error', {
            duration: 2000,
          });
        },
      );
  }

  deleteExperience(id: number) {
    this.http
      .delete<{ id: number }>(`${environment.api}/experience/${id}`)
      .pipe(withLatestFrom(this.profileStore.pipe(select(getExperiences), take(1))))
      .subscribe(
        ([res, experiences]) => {
          this.profileStore.dispatch(
            updateExperience({
              experiences: experiences.filter((exp) => exp.id !== res.id),
            }),
          );
          this.snackbar.open(`Deleted experience successfully`, 'success', {
            duration: 2000,
          });
        },
        () => {
          this.snackbar.open(`Deleted experience fail`, 'error', {
            duration: 2000,
          });
        },
      );
  }

  addExperience(experience: IUserExperience) {
    this.profileStore.pipe(select(getCurrentUser), take(1)).subscribe((user) => {
      this.http
        .post<IUserExperience>(`${environment.api}/experience/${user.id}`, experience)
        .pipe(withLatestFrom(this.profileStore.pipe(select(getExperiences), take(1))))
        .subscribe(
          ([addedExp, experiences]) => {
            this.profileStore.dispatch(
              updateExperience({
                experiences: [...experiences, addedExp],
              }),
            );

            this.snackbar.open(`Created experience ${addedExp.name} successfully`, 'success', {
              duration: 2000,
            });
          },
          () => {
            this.snackbar.open(`Adding experience fail`, 'error', {
              duration: 2000,
            });
          },
        );
    });
  }
}
