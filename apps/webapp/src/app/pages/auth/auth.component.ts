import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'portfolio-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    const token = 'asdf'; // supposedly coming from backend;
    this.authService.setToken(token);
    this.router.navigateByUrl('/');
  }
}
