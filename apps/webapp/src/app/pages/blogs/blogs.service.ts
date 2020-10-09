import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';
import { deleteBlog, loadBlogs } from '../../actions/blog.actions';

import * as fromBlog from '../../reducers/blog.reducer';
import { getBlogs } from '../../selectors/blog.selectors';
@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService,
    private readonly snackBar: MatSnackBar,
    private readonly blogsStore: Store<fromBlog.State>,
  ) {}

  fetchlBlogs() {
    return this.http.get<Blog[]>(environment.api + '/blogs');
  }

  initializeBlogs() {
    let isEmpty = false;
    this.blogsStore.pipe(select(getBlogs)).subscribe((blogs) => (isEmpty = blogs.length === 0));

    if (isEmpty) {
      this.spinner.show('blogsSpinner');
    }

    this.fetchlBlogs()
      .pipe(
        filter(() => {
          return isEmpty;
        }),
      )
      .subscribe((blogs) => {
        this.blogsStore.dispatch(loadBlogs({ blogs }));
        this.spinner.hide('blogsSpinner');
      });
  }

  createBlog(blog: Partial<Blog>) {
    return this.http.post<Blog>(environment.api + '/blogs', blog);
  }

  fetchBlog(id: number) {
    return this.http.get<Blog>(`${environment.api}/blogs/${id}`);
  }

  deleteBlog(blog: Blog) {
    this.spinner.hide('blogsSpinner');
    this.deleteBlogById(blog.id)
      .pipe(
        finalize(() => {
          this.spinner.hide('blogsSpinner');
        }),
      )
      .subscribe((res) => {
        this.blogsStore.dispatch(deleteBlog({ id: res.id }));
        this.snackBar.open(`Deleted ${blog.title} successfully`, 'success', {
          duration: 2000,
        });
      });
  }

  deleteBlogById(id: number) {
    return this.http.delete<{ id: number }>(`${environment.api}/blogs/${id}`);
  }
}
