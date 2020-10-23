import { formatDate } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Blog } from '@portfolio/api-interfaces';
import { Observable, Subject } from 'rxjs';
import { catchError, withLatestFrom } from 'rxjs/operators';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'portfolio-full-blog-content',
  templateUrl: './full-blog-content.component.html',
  styleUrls: ['./full-blog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullBlogContentComponent implements OnInit {
  blog$ = new Subject<Blog>();
  isBlogNotFound = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private readonly blogService: BlogsService) {
    this.route.params.subscribe((param) => {
      const { id } = param;
      this.blogService.fetchBlog(id).subscribe(
        (blog) => {
          this.blog$.next(blog);
          this.isBlogNotFound.next(false);
        },
        ({ status, error }) => {
          this.blog$.next(null);
          if (status === 404) {
            this.isBlogNotFound.next(true);
          }
        },
      );
    });
  }

  ngOnInit(): void {}

  parseToDateTime(dateString: string) {
    return formatDate(dateString, 'yyyy MMM dd hh:mm', 'en');
  }
}
