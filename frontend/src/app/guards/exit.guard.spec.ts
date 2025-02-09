import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { exitGuard, OnExit } from './exit.guard';

describe('exitGuard', () => {
  // Why runInInjectionContext() is NOT Needed for CanDeactivateFn?
  // Unlike CanActivateFn, the exitGuard function: ✅ Does NOT inject any services—it only calls component.onExit().
  // ✅ Only relies on function parameters (component, route, state, nextState).
  // ✅ Does not require dependency injection from Angular.

  // Since exitGuard does not depend on Angular's DI system, we can directly call it in our tests without using runInInjectionContext().

  let mockComponent: OnExit;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;
  let mockNextState: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // Mock objects
    mockComponent = { onExit: jest.fn().mockReturnValue(true) }; // ✅ Mock onExit()
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;
    mockNextState = {} as RouterStateSnapshot;
  });

  it('should allow navigation if onExit() returns true', () => {
    jest.spyOn(mockComponent, 'onExit').mockReturnValue(true); // ✅ Simulate user allowing exit
    expect(exitGuard(mockComponent, mockRoute, mockState, mockNextState)).toBe(true);
  });

  it('should prevent navigation if onExit() returns false', () => {
    jest.spyOn(mockComponent, 'onExit').mockReturnValue(false); // ✅ Simulate user blocking exit
    expect(exitGuard(mockComponent, mockRoute, mockState, mockNextState)).toBe(false);
  });

  it('should allow navigation if component has no onExit method', () => {
    const noExitComponent = {} as OnExit; // ✅ Simulate a component without onExit()
    expect(exitGuard(noExitComponent, mockRoute, mockState, mockNextState)).toBe(true);
  });
});
