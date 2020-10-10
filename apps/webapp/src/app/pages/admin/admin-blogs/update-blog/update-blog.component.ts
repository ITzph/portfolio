import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogsService } from '../../../blogs/blogs.service';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { UpsertBlog } from '../upsert-blog.abstract';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBlogComponent extends UpsertBlog implements OnInit {
  blog: Blog;

  constructor(
    readonly fb: FormBuilder,
    readonly blogsStore: Store<fromBlogs.State>,
    readonly blogService: BlogsService,
    readonly spinner: NgxSpinnerService,
    readonly snackbar: MatSnackBar,
    readonly router: Router,
    private route: ActivatedRoute,
  ) {
    super(fb, blogsStore, blogService, spinner, snackbar, router);

    this.route.params.subscribe((param) => {
      const { id } = param;

      this.blogService.fetchBlog(id).subscribe(
        (blog) => {
          this.blog = blog;
          this.blogFormGroup.setValue({
            content: blog.content,
            title: blog.title,
            tags: blog.tags,
          });
        },
        ({ status, error }) => {
          if (status === 404) {
            // this.isBlogNotFound.next(true);
          }
        },
      );
    });
  }

  ngOnInit(): void {}

  onUpdateBlog() {
    const updatedBlog = this.blogFormGroup.value;
    const { blog } = this;

    const isTagsTheSame =
      blog.tags.length === updatedBlog.tags.length &&
      blog.tags.every((value, index) => value === updatedBlog.tags.tags[index]);

    // TODO should only run if there is a difference in values
    if (
      updatedBlog.content !== blog.content ||
      updatedBlog.title !== blog.title ||
      !isTagsTheSame
    ) {
      this.blogService.updateBlog(this.blog.id, {
        content: updatedBlog.content,
        title: updatedBlog.title,
        tags: updatedBlog.tags,
      });
    }
  }
}
