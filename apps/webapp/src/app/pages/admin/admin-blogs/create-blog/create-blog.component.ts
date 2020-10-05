import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { addBlog } from '../../../../actions/blog.actions';
import { getBlogs } from '../../../../selectors/blog.selectors';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ImageDialogAbstract } from '../../admin-memes/image-dialog.abtract';

@Component({
  selector: 'portfolio-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBlogComponent extends ImageDialogAbstract implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  blogFormGroup = this.fb.group({
    content: ['', [Validators.required]],
    title: ['', [Validators.required]],
    tags: [[], [Validators.required]],
  });

  get getForm() {
    return this.blogFormGroup;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly blogsStore: Store<fromBlogs.State>,
  ) {
    super();
  }

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
            tags,
            id: new Date().getTime(),
            author: 'Code Gino',
            coverPhoto: 'test',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
      );
      this.blogFormGroup.reset();
    }
  }
}
