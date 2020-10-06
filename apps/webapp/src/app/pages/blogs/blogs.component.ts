import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import * as fromBlog from '../../reducers/blog.reducer';
import { getBlogs } from '../../selectors/blog.selectors';
import { BlogsService } from './blogs.service';
import { loadBlogs } from '../../actions/blog.actions';

@Component({
  selector: 'portfolio-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<Blog[]>;

  constructor(
    private readonly blogStore: Store<fromBlog.State>,
    private readonly blogService: BlogsService,
  ) {}

  ngOnInit(): void {
    this.blogService.fetchlBlogs().subscribe((blogs) => {
      this.blogStore.dispatch(loadBlogs({ blogs }));
    });
    this.blogs$ = this.blogStore.pipe(select(getBlogs));
  }
}
