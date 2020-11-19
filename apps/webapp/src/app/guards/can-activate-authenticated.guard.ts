import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CanActivateAuthenticatedGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authToken = '';

    this.authService
      .getToken()
      .pipe(take(1))
      .subscribe((token) => (authToken = token));

    if (authToken) {
      this.authService.checkIfAuthenticated().subscribe(() => {}, this.authService.logout);
      return true;
    }
    this.router.navigateByUrl('/auth');
    return false;
  }
}
