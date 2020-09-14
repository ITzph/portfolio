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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromProfile from '../../../reducers/profile.reducer';
import { getCurrentUser } from '../../../selectors/profile.selectors';
import { AuthService } from '../../../services/auth.service';
import { BinaryConfirmationComponent } from '../../custom-dialog/binary-confirmation/binary-confirmation.component';

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
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
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
    const dialogProp = {
      title: 'Logout',
      messages: [`Are you sure you want to logout`],
      okayLabel: 'Yes',
      noLabel: 'No',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.authService.logout();
        this.snackBar.open('Logout successfully', 'success', {
          duration: 2000,
        });
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
