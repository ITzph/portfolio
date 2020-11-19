import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { BinaryConfirmationComponent } from '../custom-dialog/binary-confirmation/binary-confirmation.component';

export abstract class HeaderAbstract {
  constructor(
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}

  get isLoggedIn$() {
    return this.authService.hasAuthToken();
  }

  get isLoggedOut$() {
    return this.authService.hasAuthToken().pipe(map((isLoggedIn) => !isLoggedIn));
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
