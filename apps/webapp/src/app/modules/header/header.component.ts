import { Component, OnInit, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { throttleTime, takeWhile, map } from 'rxjs/operators';
import { ISocialHandler } from '@portfolio/api-interfaces';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { getCurrentUser } from '../../selectors/profile.selectors';

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  socialHandlers$: Observable<ISocialHandler[]>;
  isSideNavVisible = false;

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private readonly profileStore: Store<fromProfile.State>,
  ) {}

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

  showLinks(isVisible: boolean) {
    this.isSideNavVisible = isVisible;
  }

  ngOnDestroy() {
    this.isUnsubscribed = true;
  }
}
