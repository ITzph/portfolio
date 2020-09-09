import { TestBed } from '@angular/core/testing';

import { CanActivateAuthenticatedGuard } from './can-activate-authenticated.guard';

describe('CanActivateAuthenticatedGuard', () => {
  let guard: CanActivateAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
