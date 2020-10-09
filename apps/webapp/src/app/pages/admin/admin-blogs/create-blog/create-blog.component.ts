import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addBlog } from '../../../../actions/blog.actions';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { BlogsService } from '../../../blogs/blogs.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpsertBlog } from '../upsert-blog.abstract';

@Component({
  selector: 'portfolio-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBlogComponent extends UpsertBlog implements OnInit {
  @Output() cancel = new EventEmitter<void>();

  constructor(
    readonly fb: FormBuilder,
    readonly blogsStore: Store<fromBlogs.State>,
    readonly blogService: BlogsService,
    readonly spinner: NgxSpinnerService,
    readonly snackbar: MatSnackBar,
  ) {
    super(fb, blogsStore, blogService, spinner, snackbar);
  }

  ngOnInit(): void {}

  onSaveBlog() {
    if (this.blogFormGroup.valid) {
      const { content, title, tags } = this.blogFormGroup.value;

      const newBlog = {
        content,
        title,
        tags,
        coverPhoto: 'test',
      };

      this.spinner.show('blogsSpinner');

      this.blogService
        .createBlog(newBlog)
        .pipe(
          finalize(() => {
            this.spinner.hide('blogsSpinner');
          }),
        )
        .subscribe((blog) => {
          this.blogsStore.dispatch(addBlog({ blog }));
          this.blogFormGroup.reset();

          this.snackbar.open(`Created new blog successfully`, 'success', {
            duration: 2000,
          });
          this.cancel.emit();
        });
    }
  }
}
