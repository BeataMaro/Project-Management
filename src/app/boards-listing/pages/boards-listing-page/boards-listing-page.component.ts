import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Iboard } from '../../../shared/models/board.model';
import { select, Store } from '@ngrx/store';
import * as BoardsActions from '../../store/board/board-actions';
import * as fromReducer from '../../store/board/board-reducers';
import {
  BoardsSelector,
  ErrorSelector,
  isLoadingSelector,
} from '../../store/board/board-selectors';
import { Observable } from 'rxjs';

import { ConfirmationDialog } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './boards-listing-page.component.html',
  styleUrls: ['./boards-listing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsListingPageComponent implements OnInit {
  allBoards2: Iboard[] = [];
  isLoading$: Observable<boolean>;
  isError$: Observable<string | null>;
  allBoards$: Observable<Iboard[]>;

  constructor(
    private store: Store<fromReducer.BoardsStateInterface>,
    private dialog: MatDialog,
    changeDetection: ChangeDetectionStrategy.OnPush,
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isError$ = this.store.pipe(select(ErrorSelector));
    this.allBoards$ = this.store.select(BoardsSelector);
  }

  ngOnInit() {
    console.log('this', this);
    this.store.dispatch(BoardsActions.getBoards());
  }

  deleteBoard(board: { boardId: string }) {
    this.store.dispatch(BoardsActions.deleteBoard(board));
    this.store.dispatch(BoardsActions.getBoards());
    this.allBoards$ = this.store.select(BoardsSelector);
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
