import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'portfolio-content-not-found',
  templateUrl: './content-not-found.component.html',
  styleUrls: ['./content-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
