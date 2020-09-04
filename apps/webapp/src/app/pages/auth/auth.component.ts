import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'portfolio-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private readonly authService: AuthService, private readonly fb: FormBuilder) {}

  ngOnInit(): void {}

  onLogin() {
    const { username, password } = this.authForm.value;
    this.authService.login(username, password);
  }
}
