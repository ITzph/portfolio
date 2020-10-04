import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromBlogs from '../../../reducers/blog.reducer';
import { getBlogs } from '../../../selectors/blog.selectors';
import { addBlog } from '../../../actions/blog.actions';

@Component({
  selector: 'portfolio-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss'],
})
export class AdminBlogsComponent implements OnInit {
  blogContent = this.fb.control('', [Validators.required]);

  constructor(
    private readonly fb: FormBuilder,
    private readonly blogsStore: Store<fromBlogs.State>,
  ) {}

  get blogs$() {
    return this.blogsStore.pipe(select(getBlogs));
  }

  ngOnInit(): void {}

  onSaveBlog() {
    this.blogsStore.dispatch(
      addBlog({
        blog: {
          id: new Date().getTime(),
          content: this.blogContent.value,
          author: 'Code Gino',
          coverPhoto: 'test',
          createdAt: new Date(),
          tags: ['test1', 'test2', 'test3'],
          title: 'Some Title',
          updatedAt: new Date(),
        },
      }),
    );
  }
}
