import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { BinaryConfirmationComponent } from '../../custom-dialog/binary-confirmation/binary-confirmation.component';

@Component({
  selector: 'portfolio-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$();
  }

  get isLoggedOut$() {
    return this.authService.isLoggedIn$().pipe(map((isLoggedIn) => !isLoggedIn));
  }

  onLogout() {
    const dialogProp = {
      title: 'Logout',
      messages: [`Are you sure you want to logout`],
      okayLabel: 'Yes',
      noLabel: 'No',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.authService.logout();
        this.snackBar.open('Logout successfully', 'success', {
          duration: 2000,
        });
      }
    });
  }
}
