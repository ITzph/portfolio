import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanLoadAuthenticatedGuard } from './can-load-authenticated.guard';

describe('CanLoadGuard', () => {
  let guard: CanLoadAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    guard = TestBed.inject(CanLoadAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
