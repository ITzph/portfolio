import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';
import { loadBlogs } from '../../../actions/blog.actions';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import * as fromBlogs from '../../../reducers/blog.reducer';
import { getBlogs } from '../../../selectors/blog.selectors';
import { BlogsService } from '../../blogs/blogs.service';

@Component({
  selector: 'portfolio-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogsComponent implements OnInit {
  isCreateNewBlogVisible = false;

  constructor(
    private readonly blogsStore: Store<fromBlogs.State>,
    private readonly blogService: BlogsService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService,
  ) {}

  get blogs$() {
    return this.blogsStore.pipe(select(getBlogs));
  }

  ngOnInit(): void {
    this.blogService
      .fetchlBlogs()
      .pipe(
        filter(() => {
          let isEmpty = false;
          this.blogs$.subscribe((blogs) => (isEmpty = blogs.length === 0));

          return isEmpty;
        }),
      )
      .subscribe((blogs) => {
        this.blogsStore.dispatch(loadBlogs({ blogs }));
      });
  }

  onBlogDelete(blog: Blog) {
    const dialogProp = {
      title: 'Delete Meme',
      messages: [`Are you sure you want to delete ${blog.title}?`],
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.blogService.deleteBlog(blog);
      }
    });
  }

  onBlogUpdate(blog: Blog) {}
}
