import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'portfolio-filter-by-tag',
  templateUrl: './filter-by-tag.component.html',
  styleUrls: ['./filter-by-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByTagComponent implements OnInit {
  @Output() filterValueChange = new EventEmitter<string>();
  filterValue = '';

  constructor() {}

  ngOnInit(): void {}

  onFilterValueChange(event: Event) {
    const { value } = event.target as HTMLInputElement;

    this.filterValue = value;
    this.filterValueChange.emit(this.filterValue);
  }
}
