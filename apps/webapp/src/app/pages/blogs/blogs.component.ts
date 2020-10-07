import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'portfolio-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsComponent implements OnInit {
  ngOnInit(): void {}
}
