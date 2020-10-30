import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { Observable } from 'rxjs';
import { ExperienceCategory, IUser, IUserSkill } from '@portfolio/api-interfaces';
import { getCurrentUser } from '../../selectors/profile.selectors';
import { ApiService } from '../../services/api.service';
import { finalize, map, distinctUntilChanged, take, filter, tap } from 'rxjs/operators';
import { setProfile } from '../../actions/profile.actions';
import { NgxSpinnerService } from 'ngx-spinner';

interface CategorizedSkill {
  category: string;
  skills: IUserSkill[];
}

@Component({
  selector: 'portfolio-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnInit {
  socialHandlers$ = this.profileStore.pipe(
    select(getCurrentUser),
    map((user) => {
      return user?.socialHandlers ?? [];
    }),
  );

  profile$ = this.profileStore.pipe(select(getCurrentUser));

  workExperiences$ = this.profile$.pipe(
    map((profile) => {
      return profile.experiences.filter((exp) => exp.category === ExperienceCategory.WORK);
    }),
  );

  education$ = this.profile$.pipe(
    map((profile) => {
      return profile.experiences.filter((exp) => exp.category === ExperienceCategory.EDUCATION);
    }),
  );

  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    private readonly apiService: ApiService,
    private readonly spinner: NgxSpinnerService,
  ) {}

  get categorizedSkill$() {
    return this.profile$.pipe(
      distinctUntilChanged(),
      map((profile): CategorizedSkill[] => {
        const { skills } = profile;

        return skills.reduce((acc: CategorizedSkill[], current): CategorizedSkill[] => {
          const { category } = current;

          const existingCategory = acc.find((skill) => skill.category === category);

          if (!existingCategory) {
            return [
              ...acc,
              {
                category,
                skills: [current],
              },
            ];
          } else {
            existingCategory.skills.push(current);
            return acc;
          }
        }, []);
      }),
    );
  }

  ngOnInit(): void {
    this.apiService
      .getProfile()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }),
      )
      .subscribe(
        (profile) => {
          this.updateProfile(profile);
        },
        (error) => {
          console.error(error);
        },
      );
  }

  updateProfile(profile: IUser) {
    this.profileStore.dispatch(setProfile({ profile }));
  }
}
