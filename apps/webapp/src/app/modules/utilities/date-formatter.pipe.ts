import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TIME_ZONE } from '@portfolio/api-interfaces';

@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return formatDate(new Date(value), 'yyyy-MMM-dd', TIME_ZONE.DEFAULT);
  }
}
