import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ORDER, ORDER_BY } from '../photo.model';

@Component({
  selector: 'portfolio-sort-by-property',
  templateUrl: './sort-by-property.component.html',
  styleUrls: ['./sort-by-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortByPropertyComponent implements OnInit {
  @Output() orderChange = new EventEmitter<{ orderBy: 'name' | 'description'; order: ORDER }>();

  orderFC = new FormControl(ORDER.DESC);
  orderByFC = new FormControl(ORDER_BY.CREATED_DATE);

  readonly ORDER = ORDER;
  readonly ORDER_BY = ORDER_BY;

  constructor() {}

  ngOnInit(): void {}

  onOptionChange(event: MatOptionSelectionChange, property: 'order' | 'orderBy') {
    const { value } = event.source;

    if (property === 'order') {
      this.orderFC.setValue(value);
    } else if (property === 'orderBy') {
      this.orderByFC.setValue(value);
    } else {
      throw { message: 'Invalid property' };
    }

    this.orderChange.emit({
      orderBy: this.orderByFC.value,
      order: this.orderFC.value,
      [property]: value,
    });
  }
}
