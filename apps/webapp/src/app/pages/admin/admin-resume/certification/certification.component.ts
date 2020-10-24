import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExperienceService } from '../experience/experience.service';
import { ResumeAdminComponentAbstract } from '../resume-admin-abstract.component';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { Identifiable, IUserCertification } from '@portfolio/api-interfaces';
import { getCertifications } from '../../../../selectors/profile.selectors';

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
    readonly experienceService: ExperienceService,
  ) {
    super(dialog, experienceService, snackbar);
  }

  certifications$: Observable<IUserCertification[]> = this.profileStore.pipe(
    select(getCertifications),
  );

  onAddNewExperience() {
    const cb = () => {
      const emptyCertification: IUserCertification = {
        id: null,
        dateAcquired: null,
        description: 'To Update',
        name: 'To Update',
        provider: 'To Update',
        url: '',
      };

      this.experienceService.addElement(emptyCertification);
    };

    this.showConfirmationDialog(
      'Add Experience',
      [`Are you sure you want to add new experience?`],
      cb,
    );
  }

  ngOnInit(): void {}
}
