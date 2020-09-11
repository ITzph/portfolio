import { SanitizeStringHtmlPipe } from './sanitize-string-html.pipe';

describe('SanitizeStringHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeStringHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
