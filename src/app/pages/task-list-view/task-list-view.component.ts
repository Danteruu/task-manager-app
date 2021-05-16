import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task.model';
import { TaskList } from '../../models/task-list.model';
import { TaskManagerService } from '../../services/task-manager.service';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faPen = faPen;

  listId?: number;
  taskLists: TaskList[] = [];
  tasks: Task[] = [];


  constructor(private route: ActivatedRoute, private taskManagerService: TaskManagerService) { }

  ngOnInit(): void {
    this.taskManagerService.GetAllTaskLists().subscribe(response => {
      this.taskLists = response;
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.listId = params.id;
      }
    });
  }

  taskClicked(task: Task): void {
    task.completed = !task.completed;
  }

  deleteTask(id: number, e: Event): void {
    const foundIndex = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(foundIndex, 1);
    e.stopPropagation();
  }

  editTask(id: number, e: Event): void {
    const foundIndex = this.tasks.findIndex(task => task.id === id);
    this.tasks[foundIndex].text = 'Text edited...';
    e.stopPropagation();
  }
}
