import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, select, Store } from '@ngrx/store';
import { IUserExperience, PORTFOLIO_ENDPOINTS } from '@portfolio/api-interfaces';
import { getCurrentUser, getExperiences } from '../../../../selectors/profile.selectors';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { environment } from '../../../../../environments/environment';
import { take, withLatestFrom } from 'rxjs/operators';
import { updateExperience } from '../../../../actions/profile.actions';
import { ResumeAdminServiceAbstract } from '../resume-admin-abstract.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService extends ResumeAdminServiceAbstract {
  elementType = PORTFOLIO_ENDPOINTS.experiences;

  getElements = this.profileStore.pipe(select(getExperiences));

  updateElements(elements: IUserExperience[]): Action {
    // throw new Error('Method not implemented.');
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

  // addElement(experience: IUserExperience) {
  //   this.profileStore.pipe(select(getCurrentUser), take(1)).subscribe((user) => {
  //     this.http
  //       .post<IUserExperience>(
  //         `${environment.api}/${PORTFOLIO_ENDPOINTS.experiences}/${user.id}`,
  //         experience,
  //       )
  //       .pipe(withLatestFrom(this.profileStore.pipe(select(getExperiences), take(1))))
  //       .subscribe(
  //         ([addedExp, experiences]) => {
  //           this.profileStore.dispatch(
  //             updateExperience({
  //               experiences: [...experiences, addedExp],
  //             }),
  //           );

  //           this.snackbar.open(`Created experience ${addedExp.name} successfully`, 'success', {
  //             duration: 2000,
  //           });
  //         },
  //         () => {
  //           this.snackbar.open(`Adding experience fail`, 'error', {
  //             duration: 2000,
  //           });
  //         },
  //       );
  //   });
  // }
}
