import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Blog } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'portfolio-full-blog-content',
  templateUrl: './full-blog-content.component.html',
  styleUrls: ['./full-blog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullBlogContentComponent implements OnInit {
  blog$: Observable<Blog>;
  constructor(private route: ActivatedRoute, private readonly blogService: BlogsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const { id } = param;
      this.blog$ = this.blogService.fetchBlog(id);
    });
  }

  parseToDateTime(dateString: string) {
    const [date, time] = dateString.split('T');

    const formattedDate = new Date(date).toDateString();
    const formattedTime = time.substring(0, 5);

    return `${formattedDate} ${formattedTime}`;
  }
}
