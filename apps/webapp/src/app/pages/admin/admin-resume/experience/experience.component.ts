import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { IUserExperience } from '@portfolio/api-interfaces';
import { getExperiences, getCurrentUser } from '../../../../selectors/profile.selectors';
import { Observable } from 'rxjs';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, withLatestFrom } from 'rxjs/operators';
import { updateExperience } from '../../../../actions/profile.actions';
import { environment } from '../../../../../environments/environment';
import { trackByIdOrIndex } from '../../../../utils/tracker-by-id.util';

@Component({
  selector: 'portfolio-admin-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminExperienceComponent {
  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    private readonly snackbar: MatSnackBar,
    private readonly http: HttpClient,
  ) {}

  experiences$: Observable<IUserExperience[]> = this.profileStore.pipe(select(getExperiences));

  experienceToModify: IUserExperience;

  onSelectExperience(experience: IUserExperience) {
    this.experienceToModify = experience;
  }

  onAddNewExperience() {
    const emptyExperience: IUserExperience = {
      id: null,
      endDate: null,
      events: 'Events in the experience',
      name: 'Update name',
      role: 'Update this Role',
      startDate: null,
      isActive: false,
    };

    this.profileStore.pipe(select(getCurrentUser), take(1)).subscribe((user) => {
      this.http
        .post<IUserExperience>(`${environment.api}/experience/${user.id}`, emptyExperience)
        .pipe(withLatestFrom(this.profileStore.pipe(select(getExperiences), take(1))))
        .subscribe(([addedExp, experiences]) => {
          this.profileStore.dispatch(
            updateExperience({
              experiences: [...experiences, addedExp],
            }),
          );

          this.snackbar.open(`Created experience ${addedExp.name} successfully`, 'success', {
            duration: 2000,
          });
        });
    });
  }

  onUpdate() {
    this.experienceToModify = null;
    this.snackbar.open(`Update experience successfully`, 'success', {
      duration: 2000,
    });
  }

  experienceTracker(index: number, exp: IUserExperience) {
    return trackByIdOrIndex(index, exp);
  }
}
