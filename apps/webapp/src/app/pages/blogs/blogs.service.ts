import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '@portfolio/api-interfaces';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private readonly http: HttpClient) {}

  fetchlBlogs() {
    return this.http.get<Blog[]>(environment.api + '/blogs');
  }

  createBlog(blog: Partial<Blog>) {
    return this.http.post<Blog>(environment.api + '/blogs', blog);
  }

  fetchBlog(id: number) {
    return this.http.get<Blog>(`${environment.api}/blogs/${id}`);
  }
}
