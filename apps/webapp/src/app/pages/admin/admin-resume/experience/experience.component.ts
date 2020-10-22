import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { IUserExperience } from '@portfolio/api-interfaces';
import { getExperiences, getCurrentUser } from '../../../../selectors/profile.selectors';
import { Observable } from 'rxjs';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trackByIdOrIndex } from '../../../../utils/tracker-by-id.util';
import { MatDialog } from '@angular/material/dialog';
import { BinaryConfirmationComponent } from '../../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { ExperienceService } from './experience.service';

@Component({
  selector: 'portfolio-admin-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminExperienceComponent {
  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly experienceService: ExperienceService,
  ) {}

  experiences$: Observable<IUserExperience[]> = this.profileStore.pipe(select(getExperiences));

  experienceToModify: IUserExperience;

  onSelectExperience(experience: IUserExperience) {
    this.experienceToModify = experience;
  }

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

      this.experienceService.addExperience(emptyExperience);
    };

    this.showConfirmationDialog(
      'Add Experience',
      [`Are you sure you want to add new experience?`],
      cb,
    );
  }

  onDeleteExperience(experience: IUserExperience) {
    this.showConfirmationDialog(
      'Delete Experinece',
      [`Are you sure you want to delete ${experience.name}?`],
      () => this.experienceService.deleteElement(experience.id),
    );
  }

  onUpdate() {
    this.experienceToModify = null;
    this.snackbar.open(`Update experience successfully`, 'success', {
      duration: 2000,
    });
  }

  experienceTracker(index: number, exp: IUserExperience) {
    return trackByIdOrIndex(index, exp);
  }

  private showConfirmationDialog(title: string, messages: string[], cb: Function) {
    const dialogProp = {
      title,
      messages,
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        cb();
      }
    });
  }
}
