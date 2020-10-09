import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogsService } from '../../../blogs/blogs.service';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { Blog } from '@portfolio/api-interfaces';
import { UpsertBlog } from '../upsert-blog.abstract';
import { Router } from '@angular/router';

@Component({
  selector: 'portfolio-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBlogComponent extends UpsertBlog implements OnInit {
  @Input() blog: Blog;

  constructor(
    readonly fb: FormBuilder,
    readonly blogsStore: Store<fromBlogs.State>,
    readonly blogService: BlogsService,
    readonly spinner: NgxSpinnerService,
    readonly snackbar: MatSnackBar,
    readonly router: Router,
  ) {
    super(fb, blogsStore, blogService, spinner, snackbar, router);
  }

  ngOnInit(): void {
    this.blogFormGroup.setValue({
      content: this.blog.content,
      title: this.blog.title,
      tags: this.blog.tags,
    });
  }

  onUpdateBlog() {}
}
