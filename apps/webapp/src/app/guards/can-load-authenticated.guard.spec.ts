import { TestBed } from '@angular/core/testing';

import { CanLoadAuthenticatedGuard } from './can-load-authenticated.guard';

describe('CanLoadGuard', () => {
  let guard: CanLoadAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
