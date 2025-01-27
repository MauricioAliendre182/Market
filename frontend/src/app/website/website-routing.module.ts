import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from '../guards/auth.guard';
import { exitGuard } from '../guards/exit.guard';

const routes: Routes = [
  // All the 'children' components will inherit what we have in LayoutComponent (in this
  // case a app-nav component and the router-outlet)
  // this is a way to make more abstract our code at the moment to add other modules that need to inherit
  // LayoutComponent
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Making a redirection
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      // Rules
      {
        path: 'home',
        component: HomeComponent,
      },
      // Lazyly loading this component from category.module
      // this will be a chunk that only going to load at the moment to go
      // to category/:id
      // IMPORTANT: One drawback that we have with the chunks is that they need to get through
      // the four phases of JS loading (Download JS, parse, compile and execute), hence if the user has
      // connection problems the user will need to load the chunk on demand in a very slow way
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
        // Add a custom flag 'preload' to the data to let know that this path will be preloaded
        data: {
          preload: true,
        },
      },
      {
        path: 'my-cart',
        component: MycartComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        // Here we need a guard here
        // in this case to avoid exiting from the /register page when a user is registering
        canDeactivate: [ exitGuard ],
        component: RegisterComponent,
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'profile',
        // We can not access to this endpoint if we are not authenticated
        // for that reason we need a guard here
        canActivate: [authGuard],
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
