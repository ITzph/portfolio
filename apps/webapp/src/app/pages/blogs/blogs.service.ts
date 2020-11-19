import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Blog, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';
import { deleteBlog, updateBlog } from '../../actions/blog.actions';

import * as fromBlog from '../../reducers/blog.reducer';
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

  fetchAllBlogs() {
    return this.http.get<Blog[]>(`${environment.api}/${API_ENDPOINTS.blogs}/${API_ENDPOINTS.all}`);
  }

  fetchPublishedBlogs() {
    return this.http.get<Blog[]>(`${environment.api}/${API_ENDPOINTS.blogs}`);
  }

  createBlog(blog: Partial<Blog>) {
    return this.http.post<Blog>(`${environment.api}/${API_ENDPOINTS.blogs}`, blog);
  }

  fetchBlog(id: number) {
    return this.http.get<Blog>(`${environment.api}/${API_ENDPOINTS.blogs}/${id}`);
  }

  updateBlog(id: number, blog: Partial<Blog>) {
    this.spinner.show('blogsSpinner');
    this.http
      .patch<Partial<Blog>>(`${environment.api}/${API_ENDPOINTS.blogs}/${id}`, blog)
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
    return this.http.delete<{ id: number }>(`${environment.api}/${API_ENDPOINTS.blogs}/${id}`);
  }
}
