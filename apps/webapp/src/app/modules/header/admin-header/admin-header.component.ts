import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { HeaderAbstract } from '../header.abstract';

@Component({
  selector: 'portfolio-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent extends HeaderAbstract {
  constructor(authService: AuthService, dialog: MatDialog, snackBar: MatSnackBar) {
    super(authService, dialog, snackBar);
  }
}
