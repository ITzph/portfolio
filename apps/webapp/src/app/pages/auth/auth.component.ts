import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'portfolio-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required]],
  });

  isInvalidCredentials = false;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.authForm.valid) {
      this.spinner.show('authSpinner');
      const { username, password } = this.authForm.value;
      this.authService
        .login(username, password)
        .pipe(finalize(() => this.spinner.hide('authSpinner')))
        .subscribe(
          (res) => {
            this.isInvalidCredentials = false;
            this.authService.handleLoginSuccessful(username, res.access_token);
            this.messageService.add({
              severity: 'success',
              summary: 'Login successfully',
              detail: 'Yay!',
            });
          },
          (error) => {
            if (error.status === 504) {
              this.messageService.add({
                severity: 'error',
                summary: 'Could not connect to server',
                detail: 'Error 5xx',
              });
            } else if (error.status === 401) {
              this.isInvalidCredentials = true;
              this.messageService.add({
                severity: 'error',
                summary: 'An error has occurred',
                detail: 'Errrrror!',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'An error has occurred',
                detail: 'Errrrror!',
              });
            }
          },
        );
    }
  }
}
