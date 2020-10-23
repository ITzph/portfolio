import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Identifiable } from '@portfolio/api-interfaces';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { IResumeAdminService } from './resume-admin-abstract.service';

export abstract class ResumeAdminComponentAbstract {
  abstract elementType: string;
  abstract elementToModify: Identifiable;

  constructor(
    protected readonly dialog: MatDialog,
    protected adminService: IResumeAdminService,
    protected readonly snackbar: MatSnackBar,
  ) {}

  elementTracker(index: number, skill: Identifiable) {
    return trackByIdOrIndex(index, skill);
  }

  onSelectExperience(element: Identifiable) {
    this.elementToModify = element;
  }

  onUpdate() {
    this.elementToModify = null;
    this.snackbar.open(`Updated skill successfully`, 'success', {
      duration: 2000,
    });
  }

  protected showConfirmationDialog(title: string, messages: string[], cb: Function) {
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

  // onAddNewElement() {}

  // onUpdateElement() {}

  onDeleteElement<U extends { name: string; id: number }>(element: U) {
    this.showConfirmationDialog(
      `Delete ${this.elementType}`,
      [`Are you sure you want to delete ${element.name}?`],
      () => this.adminService.deleteElement(element.id),
    );
  }
}
