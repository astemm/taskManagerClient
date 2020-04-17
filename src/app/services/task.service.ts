import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task} from '../models/task.model';
import { TaskInfo} from '../models/task-info';
import { SharedTask} from '../models/shared-task.model';
import { User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private userUrl = 'http://localhost:8080/auth';
  private taskUrl = 'http://localhost:8080/api/tasks';
  private sharedUrl = 'http://localhost:8080/shared/tasks';
  constructor(private http: HttpClient) { }
  
  getUserByName(username: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/user/${username}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/user/email/${email}`);
  }

  getTaskList(): Observable<TaskInfo[]> {
    return this.http.get<TaskInfo []>(`${this.taskUrl}`);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.taskUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.taskUrl}`, task);
  }

  createSharedTask(task: SharedTask): Observable<SharedTask> {
    return this.http.post<SharedTask>(`${this.sharedUrl}`, task);
  }
 
  updateTask(task: Object): Observable<Object> {
    return this.http.put(`${this.taskUrl}`,task);
  }
 
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.taskUrl}/${id}`, { responseType: 'text' });
  }

  deleteSharedTask(id: string): Observable<any> {
    return this.http.delete(`${this.sharedUrl}/${id}`, { responseType: 'text' });
  }

}
