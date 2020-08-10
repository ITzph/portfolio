import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ISocialHandler } from '@portfolio/api-interfaces';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';

import { Observable } from 'rxjs';
import { getCurrentUser } from '../../selectors/profile.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'portfolio-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  socialHandlers$: Observable<ISocialHandler[]>;

  constructor(private readonly profileStore: Store<fromProfile.State>) {}

  ngOnInit(): void {
    this.socialHandlers$ = this.profileStore.pipe(
      select(getCurrentUser),
      map((user) => {
        return user?.socialHandlers ?? [];
      }),
    );
  }
}
