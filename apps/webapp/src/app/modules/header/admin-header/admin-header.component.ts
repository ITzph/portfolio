import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { HeaderAbstract } from '../header.abstract';

@Component({
  selector: 'portfolio-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent extends HeaderAbstract {
  constructor(
    authService: AuthService,
    confirmationService: ConfirmationService,
    messageService: MessageService,
  ) {
    super(authService, confirmationService, messageService);
  }
}
