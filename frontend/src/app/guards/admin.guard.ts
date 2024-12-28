import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
| Observable<boolean | UrlTree>
| Promise<boolean | UrlTree>
| boolean
| UrlTree => {
  // This gurad is to make sure that only the 'admin' users has access to certain routes
  // We have two roles in our backend ROLE_ADMIN and ROLE_CUSTOMER
  const authService = inject(AuthService);
  const router = inject(Router);

  // Here we will see if we have a user with ADMIN privileges
  // THis is the case when we want to keep the state of the token in all the pages
  // so we need to inject AuthService and the see the state of our observer which is pointing out to
  // our profile (user$)
  return authService.user$
  .pipe(
    map(user => {
      // See if the role is ADMIN
      if(user?.roles.includes("ROLE_ADMIN")) {
        // In case we have the role of ADMIN we will allow that the route is accessed
        return true;
      } else {
        // In case we do have a user we will navigate again to /home page
        router.navigate(['/home']);
        return false;
      }
    })
  )
};
