import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ORDER, ORDER_BY } from '../grouping.model';

@Component({
  selector: 'portfolio-sort-by-property',
  templateUrl: './sort-by-property.component.html',
  styleUrls: ['./sort-by-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortByPropertyComponent implements OnChanges {
  @Input() order = ORDER.DESC;
  @Input() orderBy = ORDER_BY.CREATED_DATE;
  @Output() orderChange = new EventEmitter<{ orderBy: 'name' | 'description'; order: ORDER }>();

  orderFC = new FormControl(this.order);
  orderByFC = new FormControl(this.orderBy);

  readonly ORDER = ORDER;
  readonly ORDER_BY = ORDER_BY;

  ngOnChanges(changes: SimpleChanges) {
    const { order, orderBy } = changes;

    if (!order?.firstChange && order?.previousValue !== order?.currentValue) {
      this.orderFC.setValue(order.currentValue);
    }

    if (!orderBy?.firstChange && orderBy?.previousValue !== orderBy?.currentValue) {
      this.orderByFC.setValue(orderBy.currentValue);
    }
  }

  onOptionChange(event, property: 'order' | 'orderBy') {
    const { value } = event;

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
