import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { getCurrentUser } from '../../selectors/profile.selectors';
import { Observable } from 'rxjs';
import { Profile } from '@portfolio/api-interfaces';
import { loadProfiles } from '../../actions/profile.actions';

@Component({
  selector: 'portfolio-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<Profile>;
  constructor(private readonly profileStore: Store<fromProfile.State>) {}

  ngOnInit(): void {
    this.profileStore.dispatch(loadProfiles());
    this.currentUser$ = this.profileStore.pipe(select(getCurrentUser));
  }
}
