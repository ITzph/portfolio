import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import * as fromBlog from '../../../reducers/blog.reducer';
import { getBlogs } from '../../../selectors/blog.selectors';
import { BlogsService } from '../blogs.service';
import { loadBlogs } from '../../../actions/blog.actions';

@Component({
  selector: 'portfolio-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  blogs$: Observable<Blog[]>;

  constructor(
    private readonly blogStore: Store<fromBlog.State>,
    private readonly blogService: BlogsService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.blogService.fetchlBlogs().subscribe((blogs) => {
      this.blogStore.dispatch(loadBlogs({ blogs }));
    });
    this.blogs$ = this.blogStore.pipe(select(getBlogs));
  }

  parseToDateTime(dateString: string) {
    const [date, time] = dateString.split('T');

    const formattedDate = new Date(date).toDateString();
    const formattedTime = time.substring(0, 5);

    return `${formattedDate} ${formattedTime}`;
  }

  navigateToBlogContent(blog: Blog) {
    this.router.navigateByUrl('/blogs/' + blog.id);
  }
}
