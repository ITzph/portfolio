import { Injectable } from '@angular/core';
import { select, Action, Store } from '@ngrx/store';
import { Identifiable, IUserCertification, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { ResumeAdminServiceAbstract } from '../resume-admin-abstract.service';
import { getCertifications } from '../../../../selectors/profile.selectors';
import { updateCertifications } from '../../../../actions/profile.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import * as fromProfile from '../../../../reducers/profile.reducer';

@Injectable({
  providedIn: 'root',
})
export class CertificationService extends ResumeAdminServiceAbstract {
  elementType = API_ENDPOINTS.certifications;

  getElements = this.profileStore.pipe(select(getCertifications));

  constructor(
    readonly profileStore: Store<fromProfile.State>,
    readonly snackbar: MatSnackBar,
    readonly http: HttpClient,
  ) {
    super(profileStore, snackbar, http);
  }

  updateElementsDispatcher(elements: IUserCertification[]): Action {
    return updateCertifications({
      certifications: elements,
    });
  }

  updateElementOfList(element: IUserCertification, elements: IUserCertification[]): Identifiable[] {
    return elements.map((exp) => {
      const newElement: IUserCertification = element;

      return exp.id === element.id ? newElement : exp;
    });
  }
}
