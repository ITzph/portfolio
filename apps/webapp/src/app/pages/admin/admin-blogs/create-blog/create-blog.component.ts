import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { addBlog } from '../../../../actions/blog.actions';
import { getBlogs } from '../../../../selectors/blog.selectors';
import * as fromBlogs from '../../../../reducers/blog.reducer';

@Component({
  selector: 'portfolio-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBlogComponent implements OnInit {
  blogFormGroup = this.fb.group({
    content: ['', [Validators.required]],
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly blogsStore: Store<fromBlogs.State>,
  ) {}

  get blogs$() {
    return this.blogsStore.pipe(select(getBlogs));
  }

  ngOnInit(): void {}

  onSaveBlog() {
    if (this.blogFormGroup.valid) {
      const { content, title, tags } = this.blogFormGroup.value;
      this.blogsStore.dispatch(
        addBlog({
          blog: {
            content,
            title,
            id: new Date().getTime(),
            author: 'Code Gino',
            coverPhoto: 'test',
            createdAt: new Date(),
            tags: tags.split(','),
            updatedAt: new Date(),
          },
        }),
      );
      this.blogFormGroup.reset();
    }
  }
}
