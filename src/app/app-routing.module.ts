import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListViewComponent } from './pages/task-list-view/task-list-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasklists',
    pathMatch: 'full'
  },
  {
    path: 'tasklists',
    component: TaskListViewComponent
  },
  {
    path: 'tasklists/:id',
    component: TaskListViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
