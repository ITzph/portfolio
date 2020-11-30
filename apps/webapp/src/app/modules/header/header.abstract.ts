import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

export abstract class HeaderAbstract {
  constructor(
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
  ) {}

  get isLoggedIn$() {
    return this.authService.hasAuthToken();
  }

  get isLoggedOut$() {
    return this.authService.hasAuthToken().pipe(map((isLoggedIn) => !isLoggedIn));
  }

  onLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to logout?',
      accept: () => {
        this.authService.logout();
        this.messageService.add({
          severity: 'success',
          summary: 'Logout successfully',
          detail: 'Via MessageService',
        });
      },
    });
  }
}
