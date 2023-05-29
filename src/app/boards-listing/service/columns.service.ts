import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICol, IColumn } from '../../shared/models/column.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private httpClient: HttpClient) {}

  getAllColumns(boardId: string): Observable<IColumn[]> {
    // const boardId = localStorage.getItem('board_id');
    return this.httpClient.get<IColumn[]>(`boards/${boardId}/columns`);
  }

  createColumn(title: string, order: number, boardId: string): Observable<IColumn> {
    return this.httpClient.post<IColumn>(`boards/${boardId}/columns`, {
      title,
      order,
    });
  }

  deleteColumn(columnId: string, boardId: string): Observable<IColumn> {

    return this.httpClient.delete<IColumn>(
      `boards/${boardId}/columns/${columnId}`
    );
  }
}
