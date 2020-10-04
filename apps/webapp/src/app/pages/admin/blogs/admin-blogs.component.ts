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

  ngOnInit(): void {
    this.blogsStore.dispatch(
      addBlog({
        blog: {
          id: new Date().getTime(),
          content: 'initial State',
        },
      }),
    );
  }

  onSaveBlog() {
    this.blogsStore.dispatch(addBlog({ blog: { id: 1, content: this.blogContent.value } }));
  }
}
