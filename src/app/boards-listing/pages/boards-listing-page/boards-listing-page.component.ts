import { Component, EventEmitter, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

import { Iboard } from '../../../shared/models/board.model';
import { deleteBoard, getBoards } from '../../store/board/board.actions';
import {
  BoardIdSelector,
  BoardsSelector,
  ErrorSelector,
  isLoadingSelector,
} from '../../store/board/board.selectors';

import { ColumnIdSelector } from '../../store/column/column.selector';
import { BoardsService } from '../../service/boards.service';
import {
  windowInnerWidth,
  handleSize,
} from 'src/app/shared/helpers/window-size';
import { ICol, IColumn } from 'src/app/shared/models/column.model';
import { BoardsStateInterface, initialBoardsState } from '../../store/board/board.reducer';

@Component({
  selector: 'app-board',
  templateUrl: './boards-listing-page.component.html',
  styleUrls: ['./boards-listing-page.component.scss'],
})
export class BoardsListingPageComponent implements OnInit {
  isLoading$: Observable<boolean | undefined>;
  isError$: Observable<string | null | undefined>;
  allBoards$: Observable<Iboard[] | undefined>;
  boardId: Observable<string | undefined>;
  // columnId: Observable<(IColumn[] | ICol[] | undefined)[]>;
  mybreakpoint = 1;

  constructor(private store: Store, private BoardsService: BoardsService) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(ErrorSelector));
    this.allBoards$ = this.store.select(BoardsSelector) || initialBoardsState;
    this.boardId = this.store.select(BoardIdSelector);
    // this.columnId = this.store.select(ColumnIdSelector);
  }

  ngOnInit() {
    this.mybreakpoint = windowInnerWidth();
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // this.BoardsService.getAllBoards().subscribe(boards => boards.map((board) => console.log(board.title)));
    this.BoardsService.getAllBoards().subscribe();
    // console.log(this.allBoards$.subscribe((res) => res?.map((b) => b.title)));
    this.store.dispatch(getBoards());
  }

  handleReSize(event: Event) {
    this.mybreakpoint = handleSize(event);
  }

  removeBoard(boardId: string) {
    // this.BoardsService.deleteBoard(boardId);
    this.store.dispatch(deleteBoard({ boardId }));
    this.ngOnInit();
  }
}
