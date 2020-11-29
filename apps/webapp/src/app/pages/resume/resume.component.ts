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
import { FilesService } from '../files/files.service';
import { MenuItem } from 'primeng/api';

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

  menuItems: MenuItem[];

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
    private readonly filesService: FilesService,
  ) {}

  private downloadResume(fileType: 'pdf' | 'word') {
    this.filesService.getResume(fileType).subscribe((response: any) => {
      const filename = `MyResume.${fileType === 'word' ? '.docx' : 'pdf'}`;

      const dataType = response.type;
      if (filename) {
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    });
  }

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

    this.menuItems = [
      {
        label: 'PDF',
        icon: 'fa fa-file-pdf',
        command: () => {
          this.downloadResume('pdf');
        },
      },
      {
        label: 'Word',
        icon: 'fa fa-file-word',
        command: () => {
          this.downloadResume('word');
        },
      },
    ];
  }

  updateProfile(profile: IUser) {
    this.profileStore.dispatch(setProfile({ profile }));
  }
}
