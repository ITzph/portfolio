import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-blog-tile',
  templateUrl: './blog-tile.component.html',
  styleUrls: ['./blog-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogTileComponent implements OnInit {
  @Input() blog: Blog;
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

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
