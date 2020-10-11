import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadBlogs } from '../../../actions/blog.actions';
import * as fromBlog from '../../../reducers/blog.reducer';
import { getPublishedBlogs } from '../../../selectors/blog.selectors';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'portfolio-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  blogs$: Observable<Blog[]> = this.blogStore.pipe(select(getPublishedBlogs));

  constructor(
    private readonly blogStore: Store<fromBlog.State>,
    private readonly blogService: BlogsService,
    private readonly spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show('blogsSpinner');
    this.blogService
      .fetchPublishedBlogs()
      .pipe(
        finalize(() => {
          this.spinner.hide('blogsSpinner');
        }),
      )
      .subscribe((blogs) => {
        this.blogStore.dispatch(loadBlogs({ blogs }));
        this.spinner.hide('blogsSpinner');
      });
  }
}
