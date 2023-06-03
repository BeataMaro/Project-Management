import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Iboard } from '../../../shared/models/board.model';
import { deleteBoard, getBoards } from 'src/app/store/board/board.actions';
import {
  BoardsSelector,
  ErrorSelector,
  isLoadingSelector,
} from 'src/app/store/board/board.selectors';

import { BoardsService } from '../../service/boards.service';
import {
  windowInnerWidth,
  handleSize,
} from 'src/app/shared/helpers/window-size';
import { initialBoardsState } from 'src/app/store/board/board.reducer';

@Component({
  selector: 'app-board',
  templateUrl: './boards-listing-page.component.html',
  styleUrls: ['./boards-listing-page.component.scss'],
})
export class BoardsListingPageComponent implements OnInit {
  isLoading$: Observable<boolean | undefined>;
  isError$: Observable<string | null | undefined>;
  allBoards$: Observable<Iboard[] | undefined>;
  // boardId: Observable<string | undefined>;
  // columnId: Observable<(IColumn[] | ICol[] | undefined)[]>;
  mybreakpoint = 1;

  constructor(private store: Store, private BoardsService: BoardsService) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(ErrorSelector));
    this.allBoards$ = this.store.select(BoardsSelector) || initialBoardsState;
  }

  ngOnInit() {
    this.mybreakpoint = windowInnerWidth();
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.BoardsService.getAllBoards().subscribe();
    this.store.dispatch(getBoards());
  }

  handleReSize(event: Event) {
    this.mybreakpoint = handleSize(event);
  }

  removeBoard(boardId: string) {
    this.store.dispatch(deleteBoard({ boardId }));
    this.ngOnInit();
  }
}
