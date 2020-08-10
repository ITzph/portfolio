import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { Observable } from 'rxjs';
import { getCurrentUser } from '../../selectors/profile.selectors';
import { ApiService } from '../../services/api.service';
import { IUser } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { setProfile } from '../../actions/profile.actions';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'portfolio-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  profile$: Observable<IUser>;
  isTranscriptVisible = false;

  constructor(private readonly profileStore: Store<fromProfile.State>) {}

  ngOnInit(): void {
    this.profile$ = this.profileStore.pipe(select(getCurrentUser));
  }

  toggleTranscript(isVisible: boolean) {
    this.isTranscriptVisible = isVisible;
  }
}
