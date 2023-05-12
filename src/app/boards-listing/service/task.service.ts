import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itask } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'boards';
  tasks: Itask[] = [];

  constructor(private httpClient: HttpClient) {}

  addTask(item: Itask): Observable<Itask> {
    return this.httpClient.post<Itask>(this.url, item);
  }
  toggleComplete(changedItem: Itask): Observable<Itask> {
    return this.httpClient.put<Itask>(`${this.url}/tasks/${changedItem._id}`, {
      ...changedItem,
      isCompleted: !changedItem.isCompleted,
    });
    // this.tasks = this.tasks.map((item) =>
    //   changedItem.id === item.id
    //     ? { ...item, isCompleted: !changedItem.isCompleted }
    //     : item
    // );
  }
  deleteTask(taskId: string, boardId: string, columnId: string): Observable<Itask> {

    // const token = localStorage.getItem('auth_token');
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // });

    return this.httpClient.delete<Itask>(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
  }

}
