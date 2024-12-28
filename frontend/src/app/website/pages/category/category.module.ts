import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    // Now CategoryComponent is exclusively part of category.module
    // IMPORTANT: One component only can belong to a module in specific
    // this is the reason we deleted CategoryComponent from website.module
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    // Import SharedModule to have available app-products
    SharedModule
  ]
})
export class CategoryModule { }
