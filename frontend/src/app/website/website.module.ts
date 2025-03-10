import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { WebsiteRoutingModule } from './website-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from './pages/category/category.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './pages/edit-product/edit-product.component';


@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    EditProductComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    CategoryModule,
    // Here we need to implement the QuickLink module to use its strategy
    QuicklinkModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WebsiteModule { }
