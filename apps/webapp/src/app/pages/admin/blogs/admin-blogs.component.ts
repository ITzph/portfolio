import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromBlogs from '../../../reducers/blogs.reducer';
import { getBlogs } from '../../../selectors/blogs.selectors';
import { createBlog } from '../../../actions/blogs.actions';

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
    this.blogsStore.dispatch(createBlog({ content: this.blogContent.value }));
  }
}
