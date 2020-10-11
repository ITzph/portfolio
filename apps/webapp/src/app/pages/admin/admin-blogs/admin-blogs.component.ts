import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { BlogsService } from '../../blogs/blogs.service';
import * as fromBlog from '../../../reducers/blog.reducer';
import { loadBlogs } from '../../../actions/blog.actions';

@Component({
  selector: 'portfolio-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogsComponent implements OnInit {
  constructor(
    private readonly blogService: BlogsService,
    private readonly spinner: NgxSpinnerService,
    private readonly blogStore: Store<fromBlog.State>,
  ) {}

  ngOnInit(): void {
    this.spinner.show('blogsSpinner');
    this.blogService
      .fetchAllBlogs()
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
