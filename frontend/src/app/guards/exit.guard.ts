import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Let's specify the type of 'component'
// that we will have here
export interface OnExit {
  // Here we will have a function
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

// This guard will be applied when we need to exit from a form (can be login form for example)
export const exitGuard: CanDeactivateFn<OnExit> = (
  component: OnExit,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
    // We can relase a window warning with confirm()
    // this is the logic
    // const rta = confirm('Are you sure to leave the page?')
    // return rta;

    // But how we could manage the logic from rta from the component? (for example register.component)
    // We have created an interface
    // If component does not exist we allow to exit
    return component.onExit ? component.onExit() : true;
};
