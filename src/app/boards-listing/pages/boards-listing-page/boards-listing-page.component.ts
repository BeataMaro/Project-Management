import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, shareReplay } from 'rxjs';

import { Iboard } from '../../../shared/models/board.model';
import { getBoards } from '../../store/board/board-actions';
import { deleteColumn } from '../../store/column/column-actions';
import {
  BoardIdSelector,
  BoardsSelector,
  ErrorSelector,
  isLoadingSelector,
} from '../../store/board/board-selectors';

import { ColumnIdSelector } from '../../store/column/column-selector';
import { BoardsService } from '../../service/boards.service';
import {
  windowInnerWidth,
  handleSize,
} from 'src/app/shared/helpers/window-size';

@Component({
  selector: 'app-board',
  templateUrl: './boards-listing-page.component.html',
  styleUrls: ['./boards-listing-page.component.scss'],
})
export class BoardsListingPageComponent implements OnInit {
  allBoards2: Iboard[] = [];
  isLoading$: Observable<boolean>;
  isError$: Observable<string | null>;
  allBoards$: Observable<Iboard[]>;
  boardId: Observable<string | undefined>;
  columnId: Observable<string | undefined>;
  isLoggedIn: false;
  mybreakpoint: number = 1;

  constructor(
    private store: Store,
    private BoardsService: BoardsService,
    private router: Router
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(ErrorSelector));
    this.allBoards$ = this.store.select(BoardsSelector);
    this.boardId = this.store.select(BoardIdSelector);
    this.columnId = this.store.select(ColumnIdSelector);
    this.isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!) || false;
  }

  ngOnInit() {
    this.mybreakpoint = windowInnerWidth();
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    if (!this.isLoggedIn) this.router.navigateByUrl('/home');
    this.allBoards$ = this.store.select(BoardsSelector) || [];
    this.BoardsService.getAllBoards()
      .pipe(shareReplay())
      .subscribe()
      .unsubscribe();
    this.store.dispatch(getBoards());
  }

  handleSize(event: any) {
    this.mybreakpoint = handleSize(event);
  }

  deleteColumn(board: { boardId: string; columnId: string }) {
    this.store.dispatch(deleteColumn(board));
  }
}
