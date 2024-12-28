import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { GridComponent } from './pages/grid/grid.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  {
    // Intial route
    path: '',
    component: LayoutComponent,
    children: [
      // Manage the redirection
      {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full'
      },
      {
        path: 'grid',
        component: GridComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      }
    ]
  }
];

@NgModule({
  // Here we are using '.forChild' because this is a child module (feature module)
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
