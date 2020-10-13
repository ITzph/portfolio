import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUserExperience, IUser } from '@portfolio/api-interfaces';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../../reducers/profile.reducer';
import { getCurrentUser } from '../../../selectors/profile.selectors';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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

  experiences$: Observable<IUserExperience[]>;

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
      .subscribe((experience) => {});
  }

  ngOnInit(): void {
    this.experiences$ = this.profileStore.pipe(
      select(getCurrentUser),
      filter((user) => !!user),
      map((user) => {
        return user.experiences;
      }),
    );
  }
}
