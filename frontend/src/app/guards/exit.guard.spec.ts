import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { exitGuard } from './exit.guard';

describe('exitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => exitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
