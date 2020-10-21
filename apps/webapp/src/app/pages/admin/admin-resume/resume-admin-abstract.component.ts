import { MatDialog } from '@angular/material/dialog';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { IResumeAdminService } from './resume-admin-abstract.service';

export abstract class ResumeAdminComponentAbstract<T> {
  abstract elementType: string;
  constructor(protected readonly dialog: MatDialog, protected adminService: IResumeAdminService) {}

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
