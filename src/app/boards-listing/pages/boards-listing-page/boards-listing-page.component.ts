import { Component, OnInit } from '@angular/core';
import { Iboard } from '../../../shared/models/board.model';
import { select, Store } from '@ngrx/store';
import * as BoardsActions from '../../store/board/board-actions';
import * as ColumnsActions from '../../store/column/column-actions';
import * as fromReducer from '../../store/board/board-reducers';
import {
  BoardIdSelector,
  BoardsSelector,
  ErrorSelector,
  isLoadingSelector,
} from '../../store/board/board-selectors';
import { Observable } from 'rxjs';

import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from 'src/app/core/components/form-dialog/form-dialog.component';
import { ColumnsService } from '../../service/columns.service';
import {
  ColumnIdSelector,
  ColumnsSelector,
} from '../../store/column/column-selector';

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

  constructor(
    private store: Store<fromReducer.BoardsStateInterface>,
    private dialog: MatDialog,
    private ColumnsService: ColumnsService
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(ErrorSelector));
    this.allBoards$ = this.store.select(BoardsSelector);
    this.boardId = this.store.select(BoardIdSelector);
    this.columnId = this.store.select(ColumnIdSelector);
  }

  ngOnInit() {
    console.log('this', this);
    this.store.dispatch(BoardsActions.getBoards());
  }

  createColumnForm() {
    const dialogRef = this.dialog.open(FormDialog, {
      data: {
        message: 'Add new column',
        cancelButtonText: 'Cancel',
      },
    });
    // dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    //   if (confirmed) {
    //   }
    // });
  }

  deleteBoard(board: { boardId: string }) {
    this.store.dispatch(BoardsActions.deleteBoard(board));
    this.store.dispatch(BoardsActions.getBoards());
    this.store.select(BoardsSelector);
  }

  getAllColumns() {
    this.ColumnsService.getAllColumns().subscribe((res) =>
      res.map((column) =>
        console.log(`Column: ${column.title}, ${column.order}`)
      )
    );
    //przenies do serwisu
    this.store.dispatch(ColumnsActions.getColumns());
    // this.store.select(ColumnsSelector);
  }

  deleteColumn(board: { boardId: string; columnId: string }) {
    this.store.dispatch(ColumnsActions.deleteColumn(board));
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
