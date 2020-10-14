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
  ) {}

  experiences$: Observable<IUserExperience[]> = this.profileStore.pipe(select(getExperiences));

  eventsToModify: string;
  experienceToModify: IUserExperience;

  onSelectExperience(experience: IUserExperience) {
    if (!this.eventsToModify) {
      this.eventsToModify = experience.events;
      this.experienceToModify = experience;
    }
  }

  onExperienceUpdate() {
    const { experienceToModify } = this;
    const updatedExperience: Partial<IUserExperience> = {
      events: this.eventsToModify,
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
      });
  }
}
