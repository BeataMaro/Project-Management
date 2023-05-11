import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Icolumn } from 'src/app/shared/models/column.model';
import { Iboard } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}
  // private token = localStorage.getItem('auth_token');

  getAllBoards(): Observable<Iboard[]> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Iboard[]>('boards', { headers });
  }

  createBoard({ title, owner, users }: Iboard): Observable<Iboard> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post<Iboard>(
      'boards',
      { title, owner, users },
      { headers }
    );
  }

  getBoards(): Observable<Iboard[]> {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Iboard[]>(`boardsSet/${userId}`, { headers });
  }

  deleteBoard(boardId: string): Observable<Iboard> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.delete<Iboard>(`boards/${boardId}`, { headers });
  }

  getAllColumns(boardId: string): Observable<Icolumn[]> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Icolumn[]>(`boards/${boardId}/columns`, {
      headers,
    });
  }
}
