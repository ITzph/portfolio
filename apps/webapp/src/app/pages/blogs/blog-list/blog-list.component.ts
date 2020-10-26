import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Blog } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { loadBlogs } from '../../../actions/blog.actions';
import * as fromBlog from '../../../reducers/blog.reducer';
import { getPublishedBlogs } from '../../../selectors/blog.selectors';
import { BlogsService } from '../blogs.service';
import { TagCounter } from '../tag-filter/tag-filter.component';

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
    private readonly spinner: NgxSpinnerService,
  ) {}

  get tagList$(): Observable<TagCounter[]> {
    return this.blogs$.pipe(
      map((blogs) => {
        return blogs.reduce((acc: TagCounter[], curr) => {
          // Loop each blogs tags
          // check if tag is already existing
          // if true; increment the counter
          // if false; create a new entry with counter value = 1

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
    // return of([
    //   {
    //     count: 1,
    //     name: 'asdf',
    //   },
    // ]);
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
