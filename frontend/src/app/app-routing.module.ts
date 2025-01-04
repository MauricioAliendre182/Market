import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { adminGuard } from './guards/admin.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  // How to render a module instead of a component?
  // Here we need to  load our website module
  {
    path: '',
    // This is a lazy loading to bring our module WebsiteModule
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    // Add a custom flag 'preload' to the data to let know that this path will be preloaded
    data: {
      preload: true
    }
  },
  // Here we need to render CmsModule
  {
    path: 'cms',
    // This is a lazy loading to bring our module CmsModule
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
    // this route only needs to be accessed by admin users, hence we use the function guard adminGuard
    canActivate: [ adminGuard ]
  },
  // This is a global redirection
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  // Here we have 'forRoot' because is our initial routing
  imports: [RouterModule.forRoot(routes, {
    // Here we want to preload all the modules
    // This is to not wait until the user makes a click
    // this will load all the chunks from beginning
    // This is a good technique for websites that do not have many modules
    // preloadingStrategy: PreloadAllModules

    // If we want to load only certain chunks, we can use our custom service to
    // preload certain chunks associated with certain routes
    // the routes here are sending data: { preload: true }
    // preloadingStrategy: CustomPreloadService

    // Other preloading strategy is to use QuickLink
    // This is an npm module that allow us to preload only what the user watches at certain
    // moment of the page, for example if we are in '/home' and we have a link that redirect us to
    // other page that contains a chunk, QuickLink will pre-load it under the hood because it is visible to the
    // user
    // Now we need to enable this QuicklinkModule in other modules where we need
    preloadingStrategy: QuicklinkStrategy,
    useHash: true
  })],
  // providers: [
  //   {
  //     provide: LocationStrategy, useClass: HashLocationStrategy
  //   }
  // ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
