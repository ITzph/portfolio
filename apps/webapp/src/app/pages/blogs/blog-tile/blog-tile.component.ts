import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '@portfolio/api-interfaces';
import { formatDate } from '@angular/common';

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
    return formatDate(dateString, 'yyyy MMM dd hh:mm', 'en');
  }

  navigateToBlogContent(blog: Blog) {
    this.router.navigateByUrl('/blogs/' + blog.id);
  }
}
