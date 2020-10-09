import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogsService } from '../../blogs/blogs.service';

@Component({
  selector: 'portfolio-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogsComponent implements OnInit {
  // isCreateNewBlogVisible = false;

  constructor(private readonly blogService: BlogsService) {}

  ngOnInit(): void {
    this.blogService.initializeBlogs();
  }
}
