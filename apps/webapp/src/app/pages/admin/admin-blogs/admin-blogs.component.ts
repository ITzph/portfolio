import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';
import { loadBlogs } from '../../../actions/blog.actions';
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
}
