import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private readonly http: HttpClient, private readonly spinner: NgxSpinnerService) {}

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
    return this.http
      .patch<Partial<Blog>>(`${environment.api}/${API_ENDPOINTS.blogs}/${id}`, blog)
      .pipe(
        finalize(() => {
          this.spinner.hide('blogsSpinner');
        }),
        catchError((err) => {
          throw { message: err };
        }),
      );
  }

  deleteBlog(blog: Blog) {
    this.spinner.hide('blogsSpinner');
    return this.deleteBlogById(blog.id).pipe(
      finalize(() => {
        this.spinner.hide('blogsSpinner');
      }),
    );
  }

  deleteBlogById(id: number) {
    return this.http.delete<{ id: number }>(`${environment.api}/${API_ENDPOINTS.blogs}/${id}`);
  }
}
