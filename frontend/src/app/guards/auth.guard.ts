import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

// This is a function now, but before in older version it was a class
// This function will be to guard some routes of being accesible if the user is not
// authenticated
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
    // Verify that the token exists or not, if the token does not exists
    // we can not get in the route (example: /route)
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const token = tokenService.getToken();

    // OPTION WHEN WE ARE USING THE TOKEN
    // Now in case we do not have a token
    // we can redirect programatically to /home
    // this is in case a user would like to access to /profile directly without login
    // if (!token) {
    //   router.navigate(['/home'])
    //   return false
    // }

    // // One important thing here is to return a boolean
    // // either a Promise, Observable or pure boolean
    // return true;

    // OPTION WHEN WE ARE USING THE PROFILE AS SUCH
    // This is the case when we want to keep the state of the token in all the pages
    // so we need to inject AuthService and then see the state of our observer which is pointing out to
    // our profile (user$)
    const authService = inject(AuthService)

    return authService.user$
    .pipe(
      map(user => {
        if(!user) {
          router.navigate(['/home']);
          return false;
        }
        return true;
      })
    )
};
