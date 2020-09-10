import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  socialHandlers$: Observable<ISocialHandler[]>;
  isSideNavVisible = false;

  constructor(
    private readonly el: ElementRef,
    private readonly render: Renderer2,
    private readonly profileStore: Store<fromProfile.State>,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  get isLoggedOut$() {
    return this.authService.isLoggedIn$().pipe(map((isLoggedIn) => !isLoggedIn));
  }

  get isLoggedIn$() {
    return this.authService.isLoggedIn$();
  }

  isPinned = false;

  isUnsubscribed = false;

  scrollEvent: Subject<number> = new Subject();

  // FIX bug header not responding to scroll/wheel events
  ngOnInit() {
    const appRoot = document.getElementById('app-root');

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
          if (!this.isPinned) {
            this.isPinned = true;
            this.cdr.detectChanges();
          }
        } else {
          if (this.isPinned) {
            this.isPinned = false;
            this.cdr.detectChanges();
          }
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
