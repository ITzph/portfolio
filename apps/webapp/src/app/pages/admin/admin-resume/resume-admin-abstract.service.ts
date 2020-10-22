import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, Action, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import * as fromProfile from '../../../reducers/profile.reducer';
import { getCurrentUser } from '../../../selectors/profile.selectors';
import { Identifiable } from '@portfolio/api-interfaces';

export interface IResumeAdminService {
  deleteElement(id: number): void;
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

  addElement(element: Identifiable) {
    this.profileStore.pipe(select(getCurrentUser), take(1)).subscribe((user) => {
      this.http
        .post<Identifiable>(`${environment.api}/${this.elementType}/${user.id}`, element)
        .pipe(withLatestFrom(this.getElements), take(1))
        .subscribe(
          ([addedExp, experiences]) => {
            this.profileStore.dispatch(this.updateElements([...experiences, addedExp]));

            this.snackbar.open(`Created ${addedExp.name} successfully`, 'success', {
              duration: 2000,
            });
          },
          () => {
            this.snackbar.open(`Adding fail`, 'error', {
              duration: 2000,
            });
          },
        );
    });
  }

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
