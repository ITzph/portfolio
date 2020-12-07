import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExperienceCategory, IUserExperience } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExperienceService } from './experience.service';
import { ResumeAdminComponentAbstract } from '../resume-admin-abstract.component';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    readonly experienceService: ExperienceService,
    private readonly confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    super(experienceService, snackbar);
  }

  experiences$: Observable<IUserExperience[]> = this.experienceService.getElements;

  onAddNewExperience() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to add a default experience template?',
      key: 'resume-admin',
      accept: () => {
        const emptyExperience: IUserExperience = {
          id: null,
          endDate: null,
          events: 'Events in the experience',
          name: 'Update name',
          role: 'Update this Role',
          category: ExperienceCategory.WORK, // TODO Make this dynamic
          startDate: null,
          isActive: false,
        };

        this.experienceService.addElement(emptyExperience);
      },
    });
  }

  onDeleteExperience(experience: IUserExperience) {
    this.confirmationService.confirm({
      key: 'resume-admin',
      message: `Are you sure you want to delete ${experience.name}?`,
      accept: () => {
        this.experienceService.deleteElement(experience.id);
      },
    });
  }

  onUpdateCallback() {
    this.elementToModify = null;
    this.messageService.add({
      severity: 'success',
      summary: 'Updated experience successfully',
      detail: 'Via MessageService',
    });
  }
}
