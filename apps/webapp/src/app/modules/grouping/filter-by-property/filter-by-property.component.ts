import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'portfolio-filter-by-tag',
  templateUrl: './filter-by-property.component.html',
  styleUrls: ['./filter-by-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByTagComponent implements OnChanges {
  @Input() filterValue = '';
  @Input() filterKey = 'tags';
  @Output() filterValueChange = new EventEmitter<{ key: string; value: string }>();

  filterValueFC = new FormControl(this.filterValue);
  filterKeyFC = new FormControl(this.filterKey);

  ngOnChanges(changes: SimpleChanges) {
    const { filterKey, filterValue } = changes;

    if (!filterKey?.firstChange && filterKey?.previousValue !== filterKey?.currentValue) {
      this.filterKeyFC.setValue(filterKey.currentValue);
    }

    if (!filterValue?.firstChange && filterValue?.previousValue !== filterValue?.currentValue) {
      this.filterValueFC.setValue(filterValue.currentValue);
    }
  }

  onFilterValueChange(event) {
    const { value } = event.target as HTMLInputElement;

    this.filterValueFC.setValue(value);
  }

  onOptionChange(event: MatOptionSelectionChange, property: 'key' | 'value') {
    const { value } = event.source;

    if (property === 'value') {
      this.filterValueFC.setValue(value);
    } else if (property === 'key') {
      this.filterKeyFC.setValue(value);
    } else {
      throw { message: 'Invalid option' };
    }
  }

  onUpdateFilter() {
    this.filterValueChange.emit({ key: this.filterKeyFC.value, value: this.filterValueFC.value });
  }
}
