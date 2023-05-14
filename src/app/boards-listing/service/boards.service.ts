import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icolumn } from 'src/app/shared/models/column.model';
import { Iboard } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(
    private httpClient: HttpClient,
    // private router: Router,
    // private route: ActivatedRoute
  ) {}

  getAllBoards(): Observable<Iboard[]> {
    return this.httpClient.get<Iboard[]>('boards');
  }

  createBoard({ title, owner, users }: Iboard): Observable<Iboard> {
    // this.router.navigateByUrl('/boards');
    return this.httpClient.post<Iboard>('boards', { title, owner, users });
  }

  getBoards(): Observable<Iboard[]> {
    const userId = localStorage.getItem('user_id');
    return this.httpClient.get<Iboard[]>(`boardsSet/${userId}`);
  }

  deleteBoard(boardId: string): Observable<Iboard> {
    return this.httpClient.delete<Iboard>(`boards/${boardId}`);
  }

  getAllColumns(boardId: string): Observable<Icolumn[]> {
    return this.httpClient.get<Icolumn[]>(`boards/${boardId}/columns`);
  }
}
