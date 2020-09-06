import { Component, OnInit, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { throttleTime, takeWhile, map } from 'rxjs/operators';
import { ISocialHandler } from '@portfolio/api-interfaces';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { getCurrentUser } from '../../selectors/profile.selectors';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  socialHandlers$: Observable<ISocialHandler[]>;
  isSideNavVisible = false;

  constructor(
    private readonly el: ElementRef,
    private readonly render: Renderer2,
    private readonly profileStore: Store<fromProfile.State>,
    private readonly authService: AuthService,
  ) {}

  get isLoggedOut$() {
    return this.authService.isLoggedIn$().pipe(map((isLoggedIn) => !isLoggedIn));
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
    this.render.listen('body', 'wheel', () => {
      const rect = this.el.nativeElement.getBoundingClientRect().top;
      this.scrollEvent.next(rect);
    });

    const appRoot = document.getElementById('app-root');

    this.render.listen(appRoot, 'scroll', () => {
      const rect = this.el.nativeElement.getBoundingClientRect().top;
      this.scrollEvent.next(rect);
    });

    this.scrollEvent
      .pipe(
        throttleTime(50),
        takeWhile(() => !this.isUnsubscribed),
      )
      .subscribe((rect) => {
        if (rect < -20) {
          this.isPinned = true;
        } else {
          this.isPinned = false;
        }
      });
  }

  onLogout() {
    this.authService.logout();
  }

  showLinks(isVisible: boolean) {
    this.isSideNavVisible = isVisible;
  }

  ngOnDestroy() {
    this.isUnsubscribed = true;
  }
}
