import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task.model';
import { TaskList } from '../../models/task-list.model';

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
  taskLists: TaskList[] = [
    {
      id: 1,
      name: 'School projects',
      createDate: new Date(2021, 5, 15),
      deleted: false
    },
    {
      id: 2,
      name: 'Q2 2021',
      createDate: new Date(2021, 5, 15),
      deleted: false
    },
  ];
  tasks: Task[] = [];

  allTasks: Task[] = [
    {
      id: 1,
      taskListId: 1,
      text: 'C# + Angular - simple CRUD app',
      completed: false,
      deleted: false,
    },
    {
      id: 2,
      taskListId: 2,
      text: 'Visit spanish family',
      completed: true,
      deleted: false
    },
    {
      id: 3,
      taskListId: 2,
      text: 'Learn RPA basics 🎓',
      completed: false,
      deleted: false
    },
    {
      id: 4,
      taskListId: 2,
      text: 'Use some unit tests 😆🤞',
      completed: false,
      deleted: false
    },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.tasks = this.allTasks.filter(task => task.taskListId === +params.id);
        console.log('tasks', this.tasks);
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
