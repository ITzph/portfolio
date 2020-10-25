import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ResumeAdminComponentAbstract } from '../resume-admin-abstract.component';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { Identifiable, IUserCertification } from '@portfolio/api-interfaces';
import { getCertifications } from '../../../../selectors/profile.selectors';
import { CertificationService } from './certification.service';

@Component({
  selector: 'portfolio-admin-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCertificationComponent extends ResumeAdminComponentAbstract implements OnInit {
  elementType = 'certification';

  elementToModify: Identifiable;
  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    readonly snackbar: MatSnackBar,
    readonly dialog: MatDialog,
    readonly certificationService: CertificationService,
  ) {
    super(dialog, certificationService, snackbar);
  }

  certifications$: Observable<IUserCertification[]> = this.certificationService.getElements;

  onAddNewCertification() {
    const cb = () => {
      const emptyCertification: IUserCertification = {
        id: null,
        dateAcquired: new Date(),
        description: 'To Update',
        name: 'To Update',
        provider: 'To Update',
        url: '',
      };

      this.certificationService.addElement(emptyCertification);
    };

    this.showConfirmationDialog(
      'Add Certification',
      [`Are you sure you want to add new certification?`],
      cb,
    );
  }

  onDeleteCertification(certification: IUserCertification) {
    this.showConfirmationDialog(
      'Delete Certification',
      [`Are you sure you want to delete ${certification.name}?`],
      () => this.certificationService.deleteElement(certification.id),
    );
  }

  ngOnInit(): void {}
}
