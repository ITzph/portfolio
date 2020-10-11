import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, filter, finalize } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';
import { deleteBlog, loadBlogs, updateBlog } from '../../actions/blog.actions';

import * as fromBlog from '../../reducers/blog.reducer';
import { getAllBlogs, getPublishedBlogs } from '../../selectors/blog.selectors';
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

  fetchPublishedBlogs() {
    return this.http.get<Blog[]>(environment.api + '/blogs/all');
  }

  initializeBlogs(published: boolean) {
    let isEmpty = false;

    this.blogsStore.pipe(select(getAllBlogs)).subscribe((blogs) => (isEmpty = blogs.length === 0));

    if (isEmpty) {
      this.spinner.show('blogsSpinner');
    }

    this.fetchlBlogs()
      .pipe(
        filter(() => {
          return isEmpty;
        }),
        finalize(() => {
          this.spinner.hide('blogsSpinner');
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

  updateBlog(id: number, blog: Partial<Blog>) {
    this.spinner.show('blogsSpinner');
    this.http
      .patch<Partial<Blog>>(`${environment.api}/blogs/${id}`, blog)
      .pipe(
        finalize(() => {
          this.spinner.hide('blogsSpinner');
        }),
        catchError((err) => {
          throw { message: err };
        }),
      )
      .subscribe((res) => {
        // TODO handle result properly, check why result was id
        this.blogsStore.dispatch(
          updateBlog({
            blog: {
              id,
              changes: res,
            },
          }),
        );

        this.snackBar.open(`Updated ${blog.title} successfully`, 'success', {
          duration: 2000,
        });
      });
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
