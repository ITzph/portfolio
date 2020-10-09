import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromBlogs from '../../../reducers/blog.reducer';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ImageDialogAbstract } from '../admin-memes/image-dialog.abtract';
import { BlogsService } from '../../blogs/blogs.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';

export abstract class UpsertBlog extends ImageDialogAbstract {
  abstract cancel: EventEmitter<void>;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  blogFormGroup = this.fb.group({
    content: ['', [Validators.required]],
    title: ['', [Validators.required]],
    tags: [[], [Validators.required]],
  });

  constructor(
    protected readonly fb: FormBuilder,
    protected readonly blogsStore: Store<fromBlogs.State>,
    protected readonly blogService: BlogsService,
    protected readonly spinner: NgxSpinnerService,
    protected readonly snackbar: MatSnackBar,
  ) {
    super();
  }

  get getForm() {
    return this.blogFormGroup;
  }

  onCancel() {
    this.cancel.emit();
  }
}
