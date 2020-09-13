import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

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
          },
          (error) => {
            if (error.status === 401) {
              this.isInvalidCredentials = true;
            } else {
              console.error(error);
            }
          },
        );
    }
  }
}
