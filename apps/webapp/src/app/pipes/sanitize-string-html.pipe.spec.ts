import { TestBed } from '@angular/core/testing';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { SanitizeStringHtmlPipe } from './sanitize-string-html.pipe';

fdescribe('SanitizeStringHtmlPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });

  it('create an instance', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SanitizeStringHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
