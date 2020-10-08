import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';
import { deleteBlog } from '../../actions/blog.actions';

import * as fromBlog from '../../reducers/blog.reducer';
@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService,
    private readonly snackBar: MatSnackBar,
    private readonly memesStore: Store<fromBlog.State>,
  ) {}

  fetchlBlogs() {
    return this.http.get<Blog[]>(environment.api + '/blogs');
  }

  createBlog(blog: Partial<Blog>) {
    return this.http.post<Blog>(environment.api + '/blogs', blog);
  }

  fetchBlog(id: number) {
    return this.http.get<Blog>(`${environment.api}/blogs/${id}`);
  }

  deleteBlog(blog: Blog) {
    this.deleteBlogById(blog.id)
      .pipe(
        finalize(() => {
          this.spinner.hide('memesSpinner');
        }),
      )
      .subscribe((res) => {
        this.memesStore.dispatch(deleteBlog({ id: res.id }));
      });
  }

  private deleteBlogById(id: number) {
    return this.http.delete<{ id: number }>(`${environment.api}/blogs/${id}`);
  }
}
