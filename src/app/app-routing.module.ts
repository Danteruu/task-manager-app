import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasklists',
    pathMatch: 'full'
  },
  {
    path: 'tasklists',
    component: TaskListComponent
  },
  {
    path: 'tasklists/:id',
    component: TaskListComponent
  },
  {
    path: 'task/:id',
    component: TaskListComponent  // TODO: Create TaskEditViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
