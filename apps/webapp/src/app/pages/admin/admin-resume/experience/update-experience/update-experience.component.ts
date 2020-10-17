import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { IUserExperience } from '@portfolio/api-interfaces';
import { updateExperience, updateProfile } from '../../../../../actions/profile.actions';
import { getExperiences } from '../../../../../selectors/profile.selectors';
import { take, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import * as fromProfile from '../../../../../reducers/profile.reducer';

@Component({
  selector: 'portfolio-update-experience',
  templateUrl: './update-experience.component.html',
  styleUrls: ['./update-experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateExperienceComponent implements OnInit {
  @Input() experience: IUserExperience;

  @Output() closed = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();

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
    startDate: ['', [Validators.required]],
    endDate: [''],
  });

  ngOnInit(): void {
    this.experienceFormGroup.setValue({
      role: this.experience.role,
      events: this.experience.events,
      name: this.experience.name,
      startDate: this.experience.startDate,
      endDate: this.experience.endDate,
    });
  }

  onCancel() {
    this.closed.emit();
  }

  onExperienceUpdate() {
    const { experience } = this;
    const { events, name, role, startDate, endDate } = this.experienceFormGroup.value;

    const updatedExperience: Partial<IUserExperience> = {
      events,
      name,
      role,
      id: experience.id,
      startDate: formatDate(startDate, 'yyyy-MM-dd', 'sg'),
      endDate: formatDate(endDate, 'yyyy-MM-dd', 'sg'),
    };

    this.http
      .patch<IUserExperience>(`${environment.api}/experience/${experience.id}`, updatedExperience)
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

          this.experienceFormGroup.reset();
          this.update.emit();
        },
        () => {
          this.snackbar.open(`Update experience fail`, 'error', {
            duration: 2000,
          });
        },
      );
  }
}
