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

  UpdateTaskList(updatedTaskList: TaskList): Observable<boolean> {
    const url = `${this.apiUrl}/tasklist`;
    return this.http.put<boolean>(url, updatedTaskList, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  DeleteTaskList(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/tasklist/${id}`;
    return this.http.delete<boolean>(url, {
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

  AddTask(newTask: Task): Observable<boolean> {
    const url = `${this.apiUrl}/task`;
    return this.http.post<boolean>(url, newTask, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  UpdateTask(updatedTask: Task): Observable<boolean> {
    const url = `${this.apiUrl}/task`;
    return this.http.put<boolean>(url, updatedTask, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  DeleteTask(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/task/${id}`;
    return this.http.delete<boolean>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
