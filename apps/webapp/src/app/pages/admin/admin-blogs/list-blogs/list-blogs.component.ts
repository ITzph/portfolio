import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAllBlogs, getPublishedBlogs } from '../../../../selectors/blog.selectors';
import * as fromBlogs from '../../../../reducers/blog.reducer';
import { Blog } from '@portfolio/api-interfaces';
import { BlogsService } from '../../../blogs/blogs.service';
import { MatDialog } from '@angular/material/dialog';
import { BinaryConfirmationComponent } from '../../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { Router } from '@angular/router';

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
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {}

  get blogs$() {
    return this.blogStore.pipe(select(getAllBlogs));
  }

  onBlogDelete(blog: Blog) {
    const dialogProp = {
      title: 'Delete Photo',
      messages: [`Are you sure you want to delete ${blog.title}?`],
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.blogService.deleteBlog(blog);
      }
    });
  }

  onBlogUpdate(blog: Blog) {
    this.router.navigateByUrl('admin/blogs/update/' + blog.id);
  }

  onCreateNewBlog() {
    this.router.navigateByUrl('admin/blogs/create');
  }
}
