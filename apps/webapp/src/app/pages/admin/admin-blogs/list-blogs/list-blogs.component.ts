import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAllBlogs } from '../../../../selectors/blog.selectors';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { Blog } from '@portfolio/api-interfaces';
import { BlogsService } from '../../../blogs/blogs.service';
import { Router } from '@angular/router';
import { deleteBlog } from '../../../../actions/blog.actions';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'portfolio-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBlogsComponent implements OnInit {
  isCreateNewBlogVisible = false;
  constructor(
    private readonly blogStore: Store<fromBlogs.State>,
    private readonly blogService: BlogsService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {}

  get blogs$() {
    return this.blogStore.pipe(select(getAllBlogs));
  }

  onBlogDelete(blog: Blog) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${blog.title}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blogService.deleteBlog(blog).subscribe((res) => {
          this.blogStore.dispatch(deleteBlog({ id: res.id }));
          this.messageService.add({
            severity: 'success',
            summary: `Deleted ${blog.title} successfully`,
            detail: 'Via MessageService',
          });
        });
      },
    });
  }

  onBlogUpdate(blog: Blog) {
    this.router.navigateByUrl('admin/blogs/update/' + blog.id);
  }

  onCreateNewBlog() {
    this.router.navigateByUrl('admin/blogs/create');
  }
}
