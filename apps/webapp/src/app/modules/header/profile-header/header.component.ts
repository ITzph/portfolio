import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISocialHandler } from '@portfolio/api-interfaces';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../../reducers/profile.reducer';
import { getCurrentUser } from '../../../selectors/profile.selectors';
import { AuthService } from '../../../services/auth.service';
import { HeaderAbstract } from '../header.abstract';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends HeaderAbstract implements OnInit, OnDestroy {
  socialHandlers$: Observable<ISocialHandler[]>;
  isSideNavVisible = false;

  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    confirmationService: ConfirmationService,
    authService: AuthService,
    messageService: MessageService,
    @Inject(PLATFORM_ID) private platformID: Object,
  ) {
    super(authService, confirmationService, messageService);
  }

  isPinned = false;

  isUnsubscribed = false;

  scrollEvent: Subject<number> = new Subject();

  ngOnInit() {
    this.socialHandlers$ = this.profileStore.pipe(
      select(getCurrentUser),
      map((user) => {
        return user?.socialHandlers ?? [];
      }),
    );
  }

  showLinks(isVisible: boolean) {
    this.isSideNavVisible = isVisible;
  }

  ngOnDestroy() {
    this.isUnsubscribed = true;
  }
}
