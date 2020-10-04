import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeStringHtmlPipe } from '../../pipes/sanitize-string-html.pipe';

@NgModule({
  declarations: [SanitizeStringHtmlPipe],
  imports: [CommonModule],
  exports: [SanitizeStringHtmlPipe],
})
export class UtilitiesModule {}
