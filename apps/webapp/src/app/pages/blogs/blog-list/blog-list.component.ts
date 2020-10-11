import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import * as fromBlog from '../../../reducers/blog.reducer';
import { getPublishedBlogs } from '../../../selectors/blog.selectors';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'portfolio-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  blogs$: Observable<Blog[]> = this.blogStore.pipe(select(getPublishedBlogs));

  constructor(
    private readonly blogStore: Store<fromBlog.State>,
    private readonly blogService: BlogsService,
  ) {}

  ngOnInit(): void {
    this.blogService.initializeBlogs(false);
  }
}
