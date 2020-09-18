import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpHeaderInterceptor } from './http-header.interceptor';

describe('HttpHeaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpHeaderInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: HttpHeaderInterceptor = TestBed.inject(HttpHeaderInterceptor);

    expect(interceptor).toBeTruthy();
  });
});
