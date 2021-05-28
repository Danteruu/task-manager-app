import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task.model';
import { TaskList } from '../../models/task-list.model';
import { TaskManagerService } from '../../services/task-manager.service';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faPen = faPen;

  taskLists: TaskList[] = [];
  tasks: Task[] = [];
  selectedTaskListId = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskManagerService: TaskManagerService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskManagerService.GetAllTaskLists().subscribe(response => this.taskLists = response);

    this.route.params.subscribe(params => {
      if (params.id) {
        this.taskManagerService.GetTasksFromList(params.id).subscribe(response => {
          this.tasks = response;
        });
      }
    });
  }

  taskClicked(task: Task): void {
    task.completed = !task.completed;
  }

  deleteTask(id: number, e: Event): void {
    this.taskManagerService.DeleteTask(id).subscribe(result => {
      if (result){
        this.loadTasks();
      }
    });
    e.stopPropagation();
  }

  editTask(task: Task, e: Event): void {
    this.router.navigate(['/task', task.id]);
    e.stopPropagation();
  }
}
