import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export interface TagCounter {
  count: number;
  name: string;
}

@Component({
  selector: 'portfolio-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagFilterComponent implements OnInit {
  @Input() tags: TagCounter[] = [];

  selectedTags: string[] = ['sf'];

  constructor() {}

  isSelected(tag: TagCounter) {
    return !!this.selectedTags.find((t) => t === tag.name);
  }

  ngOnInit(): void {}
}
