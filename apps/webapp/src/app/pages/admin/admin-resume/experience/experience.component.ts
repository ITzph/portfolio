import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IUserExperience } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ExperienceService } from './experience.service';
import { ResumeAdminComponentAbstract } from '../resume-admin-abstract.component';

@Component({
  selector: 'portfolio-admin-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminExperienceComponent extends ResumeAdminComponentAbstract {
  elementToModify: IUserExperience;
  elementType = 'experience';

  constructor(
    readonly snackbar: MatSnackBar,
    readonly dialog: MatDialog,
    readonly experienceService: ExperienceService,
  ) {
    super(dialog, experienceService, snackbar);
  }

  experiences$: Observable<IUserExperience[]> = this.experienceService.getElements;

  onAddNewExperience() {
    const cb = () => {
      const emptyExperience: IUserExperience = {
        id: null,
        endDate: null,
        events: 'Events in the experience',
        name: 'Update name',
        role: 'Update this Role',
        startDate: null,
        isActive: false,
      };

      this.experienceService.addElement(emptyExperience);
    };

    this.showConfirmationDialog(
      'Add Experience',
      [`Are you sure you want to add new experience?`],
      cb,
    );
  }

  onDeleteExperience(experience: IUserExperience) {
    this.showConfirmationDialog(
      'Delete Experience',
      [`Are you sure you want to delete ${experience.name}?`],
      () => this.experienceService.deleteElement(experience.id),
    );
  }
}
