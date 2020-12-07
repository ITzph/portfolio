import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogsService } from '../../../blogs/blogs.service';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { UpsertBlog } from '../upsert-blog.abstract';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '@portfolio/api-interfaces';
import { MessageService } from 'primeng/api';
import { updateBlog } from '../../../../actions/blog.actions';

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
    readonly messageService: MessageService,
    readonly router: Router,
    private route: ActivatedRoute,
  ) {
    super(fb, blogsStore, blogService, spinner, router);

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

  get isValueChanged() {
    const { blog } = this;
    if (blog) {
      const { content, title, tags } = this.blogFormGroup.value;
      const isTagsTheSame =
        tags.length === blog.tags.length &&
        tags.every((value, index) => value === blog.tags[index]);

      const isValueChanged = content !== blog.content || title !== blog.title || !isTagsTheSame;

      return isValueChanged;
    }
    return false;
  }

  onUpdateBlog() {
    this.patchBlog(this.isValueChanged, true);
  }

  onPublishBlog() {
    this.patchBlog(this.isValueChanged || !this.blog.published, true);
  }

  onUnpublishBlog() {
    this.patchBlog(this.isValueChanged || this.blog.published, false);
  }

  private patchBlog(hasChanges: boolean, isPublished: boolean) {
    const updatedBlog = this.blogFormGroup.value;

    if (hasChanges) {
      this.blogService
        .updateBlog(this.blog.id, {
          content: updatedBlog.content,
          title: updatedBlog.title,
          tags: updatedBlog.tags,
          published: isPublished,
        })
        .subscribe((res) => {
          this.messageService.add({
            key: 'blog-admin',
            severity: 'success',
            summary: `Updated ${updatedBlog.title} successfully`,
            detail: 'Via MessageService',
          });

          this.router.navigateByUrl('admin/blogs');

          // TODO handle result properly, check why result was id
          this.blogsStore.dispatch(
            updateBlog({
              blog: {
                id: this.blog.id,
                changes: res,
              },
            }),
          );
        });
    } else {
      this.messageService.add({
        key: 'blog-admin',
        severity: 'warn',
        summary: 'There are no changes',
        detail: 'Via MessageService',
      });
    }
  }
}
