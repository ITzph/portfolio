import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogsService } from '../../../blogs/blogs.service';
import { ImageDialogAbstract } from '../../admin-memes/image-dialog.abtract';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { Blog } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBlogComponent extends ImageDialogAbstract implements OnInit {
  @Input() blog: Blog;
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly blogsStore: Store<fromBlogs.State>,
    private readonly blogService: BlogsService,
    private readonly spinner: NgxSpinnerService,
    private readonly snackbar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {}

  get getForm() {
    return this.blogFormGroup;
  }

  onCancel() {
    this.cancel.emit();
  }

  onUpdateBlog() {}
}
