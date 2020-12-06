import { MatSnackBar } from '@angular/material/snack-bar';
import { Identifiable } from '@portfolio/api-interfaces';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { IResumeAdminService } from './resume-admin-abstract.service';

export abstract class ResumeAdminComponentAbstract {
  abstract elementType: string;
  abstract elementToModify: Identifiable;

  constructor(
    protected adminService: IResumeAdminService,
    protected readonly snackbar: MatSnackBar,
  ) {}

  elementTracker(index: number, skill: Identifiable) {
    return trackByIdOrIndex(index, skill);
  }

  onSelectElement(element: Identifiable) {
    this.elementToModify = element;
  }

  onUpdate() {
    this.elementToModify = null;
    this.snackbar.open(`Updated skill successfully`, 'success', {
      duration: 2000,
    });
  }
}
