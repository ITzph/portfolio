import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import * as fromBlogs from '../../../reducers/blog.reducer';
import { getBlogs } from '../../../selectors/blog.selectors';
import { BlogsService } from '../../blogs/blogs.service';

@Component({
  selector: 'portfolio-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogsComponent implements OnInit {
  isCreateNewBlogVisible = false;

  constructor(
    private readonly blogStore: Store<fromBlogs.State>,
    private readonly blogService: BlogsService,
    private readonly dialog: MatDialog,
  ) {}

  get blogs$() {
    return this.blogStore.pipe(select(getBlogs));
  }

  ngOnInit(): void {
    this.blogService.initializeBlogs();
  }

  onBlogDelete(blog: Blog) {
    const dialogProp = {
      title: 'Delete Meme',
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

  onBlogUpdate(blog: Blog) {}
}
