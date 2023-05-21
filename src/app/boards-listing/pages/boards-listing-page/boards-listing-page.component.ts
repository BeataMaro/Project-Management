import { Component, OnInit } from '@angular/core';
import { Iboard } from '../../../shared/models/board.model';
import { select, Store } from '@ngrx/store';
import { getBoards, deleteBoard } from '../../store/board/board-actions';
import { deleteColumn } from '../../store/column/column-actions';
import {
  BoardIdSelector,
  BoardsSelector,
  ErrorSelector,
  isLoadingSelector,
} from '../../store/board/board-selectors';
import { Observable, shareReplay } from 'rxjs';

import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ColumnIdSelector } from '../../store/column/column-selector';
import { BoardsService } from '../../service/boards.service';
import { Router } from '@angular/router';

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

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private BoardsService: BoardsService,
    private router: Router,
   
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(ErrorSelector));
    this.allBoards$ = this.store.select(BoardsSelector);
    this.boardId = this.store.select(BoardIdSelector);
    this.columnId = this.store.select(ColumnIdSelector);
    this.isLoggedIn = JSON.parse(localStorage.getItem('is_loggedin')!) || false;
  }

  ngOnInit() {
    if (!this.isLoggedIn) this.router.navigateByUrl('/home');
    this.allBoards$ = this.store.select(BoardsSelector);
    this.BoardsService.getAllBoards().pipe(shareReplay()).subscribe();
    this.store.dispatch(getBoards());
  }

  deleteBoard(board: { boardId: string }) {
    this.store.dispatch(deleteBoard(board));
    this.BoardsService.deleteBoard(board.boardId).subscribe();
    this.ngOnInit();
  }

  deleteColumn(board: { boardId: string; columnId: string }) {
    this.store.dispatch(deleteColumn(board));
  }

  openDialog(board: { boardId: string }) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Do you want to delete the board and the associated tasks?',
        cancelButtonText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteBoard(board);
      }
    });
  }
}
