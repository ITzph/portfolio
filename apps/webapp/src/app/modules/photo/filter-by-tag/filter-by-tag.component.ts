import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'portfolio-filter-by-tag',
  templateUrl: './filter-by-tag.component.html',
  styleUrls: ['./filter-by-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByTagComponent implements OnInit {
  @Output() filterValueChange = new EventEmitter<{ key: string; value: string }>();

  filterValue = new FormControl('');
  filterKey = new FormControl('tags');

  constructor() {}

  ngOnInit(): void {}

  get filteredOptions(): string[] {
    return ['tag1', 'tag2', 'tag3'];
  }

  onFilterValueChange(event) {
    const { value } = event.target as HTMLInputElement;

    this.filterValue.setValue(value);
    this.filterValueChange.emit({ key: this.filterKey.value, value });
  }

  onOptionChange(event: MatOptionSelectionChange, property: 'key' | 'value') {
    const { value } = event.source;

    if (property === 'value') {
      this.filterValue.setValue(value);
    } else if (property === 'key') {
      this.filterKey.setValue(value);
    } else {
      throw { message: 'Invalid option' };
    }

    this.filterValueChange.emit({ key: this.filterKey.value, value: this.filterValue.value });
  }
}
