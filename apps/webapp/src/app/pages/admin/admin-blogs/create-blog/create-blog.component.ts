import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { addBlog } from '../../../../actions/blog.actions';
import { getBlogs } from '../../../../selectors/blog.selectors';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ImageDialogAbstract } from '../../admin-memes/image-dialog.abtract';
import { BlogsService } from '../../../blogs/blogs.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'portfolio-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBlogComponent extends ImageDialogAbstract implements OnInit {
  @Output() cancel = new EventEmitter<void>();
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
    private readonly blogService: BlogsService,
    private readonly spinner: NgxSpinnerService,
    private readonly snackbar: MatSnackBar,
  ) {
    super();
  }

  get blogs$() {
    return this.blogsStore.pipe(select(getBlogs));
  }

  ngOnInit(): void {}

  onCancel() {
    this.cancel.emit();
  }

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
