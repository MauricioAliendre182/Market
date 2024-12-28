import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {
  // This service will be to pre-load the resources that we need
  // And not all the resources
  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Here we will choose what route we will pre-load
    if (route.data && route.data['preload']) {
      // if the route data exits and contains the 'preload' flaf (see aaa-routing and web-routing for reference of the routes)
      // we will execute this load() function which will preload the chunk associated with a certain route
      return load()
    }

    // Else, return an empty obersvable, for that we need to function 'of()'
    return of(null);
  }

}
