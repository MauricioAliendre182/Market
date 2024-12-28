import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes: Routes = [
    // These are the paths for category/
    // the idea is to load lazily this component in website-routing.module
    {
      path: ":id",
      component: CategoryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
