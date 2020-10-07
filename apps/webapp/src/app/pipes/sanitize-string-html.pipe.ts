import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeStringHtml',
})
export class SanitizeStringHtmlPipe implements PipeTransform {
  constructor(private readonly domSanitizer: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): unknown {
    const sanitizedValue = this.domSanitizer.sanitize(SecurityContext.STYLE, value);
    return this.domSanitizer.bypassSecurityTrustHtml(sanitizedValue);
  }
}
