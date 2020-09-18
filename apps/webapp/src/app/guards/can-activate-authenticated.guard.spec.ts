import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateAuthenticatedGuard } from './can-activate-authenticated.guard';

describe('CanActivateAuthenticatedGuard', () => {
  let guard: CanActivateAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    guard = TestBed.inject(CanActivateAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
