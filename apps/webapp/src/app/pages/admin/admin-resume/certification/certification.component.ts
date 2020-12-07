import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResumeAdminComponentAbstract } from '../resume-admin-abstract.component';
import { Identifiable, IUserCertification, TIME_ZONE } from '@portfolio/api-interfaces';
import { CertificationService } from './certification.service';
import { formatDate } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    readonly snackbar: MatSnackBar,
    readonly certificationService: CertificationService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
  ) {
    super(certificationService, snackbar);
  }

  certifications$: Observable<IUserCertification[]> = this.certificationService.getElements;

  onAddNewCertification() {
    this.confirmationService.confirm({
      key: 'resume-admin',
      message: 'Are you sure that you want to add a default experience template?',
      accept: () => {
        const emptyCertification: IUserCertification = {
          id: null,
          dateAcquired: formatDate(new Date(), 'yyyy-MM-dd', TIME_ZONE.DEFAULT),
          description: 'To Update',
          name: 'To Update',
          provider: 'To Update',
          url: '',
        };

        this.certificationService.addElement(emptyCertification);
      },
    });
  }

  onDeleteCertification(certification: IUserCertification) {
    this.confirmationService.confirm({
      key: 'resume-admin',
      message: `Are you sure you want to delete ${certification.name}?`,
      accept: () => {
        this.certificationService.deleteElement(certification.id);
      },
    });
  }

  onUpdateCallback() {
    this.elementToModify = null;
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  ngOnInit(): void {}
}
