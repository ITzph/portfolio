import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUserExperience } from '@portfolio/api-interfaces';
import { getExperiences } from '../../../../selectors/profile.selectors';
import { Observable } from 'rxjs';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { withLatestFrom } from 'rxjs/operators';
import { updateProfile } from '../../../../actions/profile.actions';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private readonly http: HttpClient,
    private readonly fb: FormBuilder,
    private readonly snackbar: MatSnackBar,
  ) {}

  experienceFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    role: ['', [Validators.required]],
    events: ['', [Validators.required]],
  });

  experiences$: Observable<IUserExperience[]> = this.profileStore.pipe(select(getExperiences));

  experienceToModify: IUserExperience;

  onSelectExperience(experience: IUserExperience) {
    // this.events.setValue(experience.events);
    this.experienceFormGroup.setValue({
      role: experience.role,
      events: experience.events,
      name: experience.name,
    });
    this.experienceToModify = experience;
  }

  experienceTracker(index: number, exp: IUserExperience) {
    return trackByIdOrIndex(index, exp);
  }

  get events() {
    return this.experienceFormGroup.get('events');
  }

  onExperienceUpdate() {
    const { experienceToModify } = this;
    const { events, name, role } = this.experienceFormGroup.value;

    const updatedExperience: Partial<IUserExperience> = {
      events,
      name,
      role,
      id: experienceToModify.id,
    };

    this.http
      .patch<IUserExperience>(
        `${environment.api}/experience/${experienceToModify.id}`,
        updatedExperience,
      )
      .pipe(withLatestFrom(this.profileStore.pipe(select(getExperiences))))
      .subscribe(([experience, experiences]) => {
        this.profileStore.dispatch(
          updateProfile({
            profile: {
              experiences: experiences.map((exp) => {
                const newExperience: IUserExperience = {
                  id: experience.id,
                  events: experience.events,
                  endDate: experience?.endDate ?? exp.endDate,
                  startDate: experience?.startDate ?? exp.startDate,
                  name: experience?.name ?? exp.name,
                  role: experience?.role ?? exp.role,
                };

                return exp.id === experience.id ? newExperience : exp;
              }),
            },
          }),
        );

        this.experienceToModify = null;
        this.experienceFormGroup.reset();

        this.snackbar.open(`Update experience successfully`, 'success', {
          duration: 2000,
        });
      });
  }
}
