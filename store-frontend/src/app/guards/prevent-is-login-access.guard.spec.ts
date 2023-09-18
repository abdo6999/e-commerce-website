import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventIsLoginAccessGuard } from './prevent-is-login-access.guard';

describe('preventIsLoginAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventIsLoginAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
