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
import { IUserExperience, TIME_ZONE } from '@portfolio/api-interfaces';
import { updateExperience, updateProfile } from '../../../../../actions/profile.actions';
import { getExperiences } from '../../../../../selectors/profile.selectors';
import { take, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import * as fromProfile from '../../../../../reducers/profile.reducer';
import { ExperienceService } from '../experience.service';

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
    private readonly fb: FormBuilder,
    private readonly experienceService: ExperienceService,
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
      startDate: formatDate(startDate, 'yyyy-MM-dd', TIME_ZONE.DEFAULT),
      endDate: formatDate(endDate, 'yyyy-MM-dd', TIME_ZONE.DEFAULT),
    };

    const callback = () => {
      this.experienceFormGroup.reset();
      this.update.emit();
    };

    this.experienceService.updateElement(experience.id, updatedExperience, callback);
  }
}
