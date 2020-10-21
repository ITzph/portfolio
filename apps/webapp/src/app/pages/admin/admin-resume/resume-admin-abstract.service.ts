import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import * as fromProfile from '../../../reducers/profile.reducer';

export interface IResumeAdminService {
  deleteElement(id: number): void;
}

export interface Identifiable {
  id: string | number;
}

export abstract class ResumeAdminServiceAbstract implements IResumeAdminService {
  abstract elementType: string;

  constructor(
    protected readonly profileStore: Store<fromProfile.State>,
    protected readonly snackbar: MatSnackBar,
    protected readonly http: HttpClient,
  ) {}

  abstract getElements: Observable<Identifiable[]>;

  abstract updateElements(elements: Identifiable[]): Action;

  deleteElement(id: number): void {
    this.http
      .delete<{ id: number }>(`${environment.api}/${this.elementType}/${id}`)
      .pipe(withLatestFrom(this.getElements), take(1))
      .subscribe(
        ([res, skills]) => {
          this.profileStore.dispatch(
            this.updateElements(skills.filter((obj) => obj.id !== res.id)),
          );
          this.snackbar.open(`Deleted skill successfully`, 'success', {
            duration: 2000,
          });
        },
        () => {
          this.snackbar.open(`Delete skill fail`, 'error', {
            duration: 2000,
          });
        },
      );
  }
}
