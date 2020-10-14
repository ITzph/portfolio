import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUserExperience } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../../reducers/profile.reducer';
import { getExperiences } from '../../../selectors/profile.selectors';
import { map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { updateProfile } from '../../../actions/profile.actions';

@Component({
  selector: 'portfolio-admin-resume',
  templateUrl: './admin-resume.component.html',
  styleUrls: ['./admin-resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminResumeComponent implements OnInit {
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

  ngOnInit(): void {}
}
