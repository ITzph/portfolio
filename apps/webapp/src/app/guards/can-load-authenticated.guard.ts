import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
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
export class CanLoadAuthenticatedGuard implements CanLoad {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
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
