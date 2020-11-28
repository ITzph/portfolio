import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'portfolio-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListComponent implements OnInit {
  @Input() text = 'Empty list';
  constructor() {}

  ngOnInit(): void {}
}
