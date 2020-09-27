import { Component, OnInit } from '@angular/core';
import { IUser } from '@portfolio/api-interfaces';
import * as fromProfile from './reducers/profile.reducer';
import { Observable } from 'rxjs';
import { getCurrentUser } from './selectors/profile.selectors';
import { ApiService } from './services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { setProfile } from './actions/profile.actions';
import { finalize } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'portfolio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  profile$: Observable<IUser>;
  isTranscriptVisible = false;

  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    private readonly apiService: ApiService,
    private readonly spinner: NgxSpinnerService,
    private readonly authService: AuthService,
  ) {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$();
  }

  ngOnInit(): void {
    // TODO optimize to prevent loading when there is a store value
    this.profile$ = this.profileStore.pipe(select(getCurrentUser));
    this.spinner.show();
    this.apiService
      .getProfile()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }),
      )
      .subscribe(
        (profile) => {
          this.updateProfile(profile);
        },
        (error) => {
          console.error(error);
        },
      );

    this.authService.initializeAuthCredentials();
  }

  updateProfile(profile: IUser) {
    this.profileStore.dispatch(setProfile({ profile }));
  }
}
