import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISocialHandler } from '@portfolio/api-interfaces';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromProfile from '../../../reducers/profile.reducer';
import { getCurrentUser } from '../../../selectors/profile.selectors';
import { AuthService } from '../../../services/auth.service';
import { HeaderAbstract } from '../header.abstract';

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
    authService: AuthService,
    snackBar: MatSnackBar,
    dialog: MatDialog,
  ) {
    super(authService, dialog, snackBar);
  }

  isPinned = false;

  isUnsubscribed = false;

  scrollEvent: Subject<number> = new Subject();

  ngOnInit() {
    const appRoot = document.getElementById('app-root');

    this.socialHandlers$ = this.profileStore.pipe(
      select(getCurrentUser),
      map((user) => {
        return user?.socialHandlers ?? [];
      }),
    );
    // This is for reference, if I want to return changing of header

    // this.render.listen('body', 'wheel', () => {
    //   const rect = this.el.nativeElement.getBoundingClientRect().top;
    //   this.scrollEvent.next(rect);
    // });

    // this.render.listen(appRoot, 'scroll', () => {
    //   const rect = this.el.nativeElement.getBoundingClientRect().top;
    //   this.scrollEvent.next(rect);
    // });

    // this.scrollEvent
    //   .pipe(
    //     throttleTime(50),
    //     takeWhile(() => !this.isUnsubscribed),
    //   )
    //   .subscribe((rect) => {
    //     if (rect < -20) {
    //       if (!this.isPinned) {
    //         this.isPinned = true;
    //         this.cdr.detectChanges();
    //       }
    //     } else {
    //       if (this.isPinned) {
    //         this.isPinned = false;
    //         this.cdr.detectChanges();
    //       }
    //     }
    //   });
  }

  showLinks(isVisible: boolean) {
    this.isSideNavVisible = isVisible;
  }

  ngOnDestroy() {
    this.isUnsubscribed = true;
  }
}
