import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeStringHtmlPipe } from '../../pipes/sanitize-string-html.pipe';
import { DateFormatterPipe } from './date-formatter.pipe';

@NgModule({
  declarations: [SanitizeStringHtmlPipe, DateFormatterPipe],
  imports: [CommonModule],
  exports: [SanitizeStringHtmlPipe, DateFormatterPipe],
})
export class UtilitiesModule {}
