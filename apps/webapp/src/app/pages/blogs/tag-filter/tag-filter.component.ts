import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

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
  @Output() selectedChange = new EventEmitter<Set<string>>();

  selectedTags: Set<string> = new Set();

  constructor() {}

  isSelected(tag: TagCounter) {
    return !!this.selectedTags.has(tag.name);
  }

  onTagClick(tag: TagCounter) {
    if (this.selectedTags.has(tag.name)) {
      this.selectedTags.delete(tag.name);
    } else {
      this.selectedTags.add(tag.name);
    }
    this.selectedChange.emit(this.selectedTags);
  }

  tagTracker(index: number, tag: TagCounter) {
    return tag ? tag.name : index;
  }

  ngOnInit(): void {}
}
