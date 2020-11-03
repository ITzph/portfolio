import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, withLatestFrom } from 'rxjs/operators';
import { loadBlogs } from '../../../actions/blog.actions';
import * as fromBlog from '../../../reducers/blog.reducer';
import { getPublishedBlogs } from '../../../selectors/blog.selectors';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { BlogsService } from '../blogs.service';
import { TagCounter } from '../tag-filter/tag-filter.component';

@Component({
  selector: 'portfolio-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  tagsFilter$: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set());

  blogs$: Observable<Blog[]> = this.blogStore.pipe(select(getPublishedBlogs));

  get filteredBlogs$() {
    return this.blogs$.pipe(
      withLatestFrom(this.tagsFilter$),
      map(([blogs, filters]) => {
        const filterSize = filters.size;

        if (filterSize === 0) {
          return blogs;
        } else {
          return blogs.filter((blog) => blog.tags.findIndex((tag) => filters.has(tag)) !== -1);
        }
      }),
    );
  }

  constructor(
    private readonly blogStore: Store<fromBlog.State>,
    private readonly blogService: BlogsService,
    private readonly spinner: NgxSpinnerService, // private cdr: ChangeDetectorRef,
  ) {}

  onSelectedTagChange(tags: Set<string>) {
    this.tagsFilter$.next(tags);
  }

  blogTracker(index: number, blog: Blog) {
    return trackByIdOrIndex(index, blog);
  }

  get tagList$(): Observable<TagCounter[]> {
    return this.blogs$.pipe(
      map((blogs) => {
        return blogs.reduce((acc: TagCounter[], curr) => {
          for (let i = 0; i < curr.tags.length; i++) {
            const tag = curr.tags[i];

            const existingTag = acc.find((_tag) => _tag.name === tag);

            if (!existingTag) {
              acc.push({
                name: tag,
                count: 1,
              });
            } else {
              existingTag.count += 1;
            }
          }

          return acc;
        }, []);
      }),
    );
  }

  ngOnInit(): void {
    this.spinner.show('blogsSpinner');
    this.blogService
      .fetchPublishedBlogs()
      .pipe(
        finalize(() => {
          this.spinner.hide('blogsSpinner');
        }),
      )
      .subscribe((blogs) => {
        this.blogStore.dispatch(loadBlogs({ blogs }));
        this.spinner.hide('blogsSpinner');
      });
  }
}
