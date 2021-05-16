import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskList } from '../models/task-list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  apiUrl = 'http://localhost:5000/api/taskmanager';

  constructor(private http: HttpClient) { }

  AddTaskList(newTaskList: TaskList): Observable<boolean> {
    const url = `${this.apiUrl}/tasklist`;
    return this.http.post<boolean>(url, newTaskList, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  GetAllTaskLists(): Observable<TaskList[]> {
    const url = `${this.apiUrl}/tasklists`;
    return this.http.get<TaskList[]>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  GetTasksFromList(listId: number): Observable<Task[]> {
    const url = `${this.apiUrl}/tasklist/${listId}/tasks`;
    return this.http.get<Task[]>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
