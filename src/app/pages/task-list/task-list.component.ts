import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task.model';
import { TaskList } from '../../models/task-list.model';
import { TaskManagerService } from '../../services/task-manager.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faPen = faPen;

  activeListId = 0;
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
        this.activeListId = params.id;
        this.taskManagerService.GetTasksFromList(params.id).subscribe(response => {
          this.tasks = response.sort((a, b) => +a.completed - +b.completed || a.id - b.id);
        });
      } else {
        this.activeListId = 0;
      }
    });
  }

  addList(): void {
    Swal.fire({
      title: 'New List',
      input: 'text',
      inputPlaceholder: 'Type in the list name...',
      confirmButtonText: 'Add',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'button is-primary',
        cancelButton: 'button is-danger ml-2'
      },
      heightAuto: false
    }).then(swalResult => {
      if (swalResult.isConfirmed) {
        this.taskManagerService.AddTaskList(new TaskList(swalResult.value)).subscribe(result => {
          if (result) {
            this.showSuccessSwal('New list has been added.');
            this.loadTasks();
          } else {
            this.showErrorSwal();
          }
        });
      }
    });
  }

  editList(list: TaskList, e: Event): void {
    Swal.fire({
      title: 'Edit Task List',
      input: 'text',
      inputValue: list.name,
      inputPlaceholder: 'Type in the task name...',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Cancel`,
      cancelButtonText: 'Delete List',
      allowOutsideClick: false,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'button is-primary',
        cancelButton: 'button is-danger ml-2',
        denyButton: 'button is-light ml-2',
      },
      heightAuto: false
    }).then(swalResult => {
      if (swalResult.isConfirmed) {
        list.name = swalResult.value;
        this.taskManagerService.UpdateTaskList(list).subscribe(result => {
          if (result) {
            this.showSuccessSwal('Task List was edited!');
            this.loadTasks();
          } else {
            this.showErrorSwal();
          }
        });
      } else if (swalResult.isDismissed) {
        Swal.fire({
          title: 'Delete Task List',
          text: 'Do you want to delete this task list?',
          confirmButtonText: 'Yes',
          showCancelButton: true,
          cancelButtonText: 'No',
          allowOutsideClick: false,
          allowEscapeKey: false,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'button is-primary',
            cancelButton: 'button is-danger ml-2'
          },
          heightAuto: false
        }).then(swalDeleteResult => {
          if (swalDeleteResult.isConfirmed) {
            this.taskManagerService.DeleteTaskList(list.id).subscribe(result => {
              if (result) {
                this.router.navigate(['/tasklists']);
                this.showSuccessSwal('Task List was deleted!');
                this.loadTasks();
              } else {
                this.showErrorSwal();
              }
            });
          }
        });
      }
    });
  }

  addTask(): void {
    Swal.fire({
      title: 'New Task',
      input: 'text',
      inputPlaceholder: 'Type in the task name...',
      confirmButtonText: 'Add',
      showCancelButton: true,
      allowOutsideClick: false,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'button is-primary',
        cancelButton: 'button is-danger ml-2'
      },
      heightAuto: false
    }).then(swalResult => {
      if (swalResult.isConfirmed) {
        this.taskManagerService.AddTask(new Task(swalResult.value, this.activeListId)).subscribe(result => {
          if (result) {
            this.loadTasks();
          } else {
            this.showErrorSwal();
          }
        });
      }
    });
  }

  editTask(task: Task, e: Event): void {
    Swal.fire({
      title: 'Edit Task',
      input: 'text',
      inputValue: task.text,
      inputPlaceholder: 'Type in the task name...',
      confirmButtonText: 'Save',
      showCancelButton: true,
      allowOutsideClick: false,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'button is-primary',
        cancelButton: 'button is-danger ml-2'
      },
      heightAuto: false
    }).then(swalResult => {
      if (swalResult.isConfirmed) {
        task.text = swalResult.value;
        this.taskManagerService.UpdateTask(task).subscribe(result => {
          if (result) {
            this.showSuccessSwal('Task was edited!');
            this.loadTasks();
          } else {
            this.showErrorSwal();
          }
        });
      }
    });
    e.stopPropagation();
  }

  deleteTask(id: number, e: Event): void {
    Swal.fire({
      title: 'Delete Task',
      text: 'Do you want to delete this task?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'button is-primary',
        cancelButton: 'button is-danger ml-2'
      },
      heightAuto: false
    }).then(swalResult => {
      if (swalResult.isConfirmed) {
        this.taskManagerService.DeleteTask(id).subscribe(result => {
          if (result) {
            this.showSuccessSwal('Task was deleted!');
            this.loadTasks();
          } else {
            this.showErrorSwal();
          }
        });
      }
    });

    e.stopPropagation();
  }

  toggleComplete(task: Task): void {
    task.completed = !task.completed;
    this.taskManagerService.UpdateTask(task).subscribe(result => {
      if (result) {
        this.tasks.sort((a, b) => +a.completed - +b.completed || a.id - b.id);
      }
      console.log('toggleComplete result', result);
    });
  }

  showSuccessSwal(text: string): void {
    Swal.fire({
      title: 'Success!',
      text,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      heightAuto: false
    });
  }

  showErrorSwal(): void {
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong!',
      icon: 'error',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      heightAuto: false
    });
  }
}
