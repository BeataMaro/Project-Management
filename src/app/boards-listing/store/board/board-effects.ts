import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  finalize,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './board-reducers';
import { BoardsService } from '../../service/boards.service';
import {
  getBoards,
  deleteBoard,
  addBoard,
  getBoardsFailure,
  getBoardsSuccess,
  getColumns,
  getColumnsSuccess,
  getColumnsFailure,
  addColumn,
} from './board-actions';
import { BoardIdSelector, BoardsSelector } from './board-selectors';
import { ColumnsSelector } from '../column/column-selector';
import { ColumnsService } from '../../service/columns.service';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.BoardsStateInterface>,
    private boardsService: BoardsService,
    private columnsService: ColumnsService
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBoards),
      switchMap(() =>
        from(this.boardsService.getAllBoards()).pipe(
          map((boards) => getBoardsSuccess({ boards: boards })),
          catchError((error) => of(getBoardsFailure({ error })))
        )
      )
      // mergeMap(() =>
      //   this.boardsService.getAllBoards().pipe(
      //     map((boards) => getBoardsSuccess({ boards })),
      //     catchError((error) =>
      //       of(getBoardsFailure({ error: error.message }))
      //     )
      //   )
      // )
    )
  );

  // To też działa
  // deleteBoard$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(deleteBoard),
  //     mergeMap(({ boardId }) =>
  //       this.boardsService.deleteBoard(boardId).pipe(
  //         map(() => deleteBoard({ boardId })),
  //         catchError((error) => of(getBoardsFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );

  addBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addBoard),
        withLatestFrom(this.store.select(BoardsSelector)),
        switchMap(([action, boards]) => from(this.boardsService.getAllBoards()))
      ),
    { dispatch: false }
  );

  deleteBoard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteBoard),
        withLatestFrom(this.store.select(BoardIdSelector)),
        switchMap(([action, boards]) =>
          from(this.boardsService.deleteBoard(action.boardId))
        )
      ),
    { dispatch: false }
  );
  // fetchColumns$ = createEffect(() =>
  //   mergeMap(() =>
  //     this.boardsService
  //       .getAllBoards()
  //       .pipe(map((board) => getColumns(board)))
  //   )
  // );
  addColumn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addColumn),
        withLatestFrom(this.store.select(BoardsSelector)),
        switchMap(([action]) =>
          from(
            this.columnsService.createColumn(
              action.column.title,
              action.column.order,
              action.boardId
            )
          )
        )
        // switchMap(([action, boards]) => from(this.columnsService.getAllColumns(action.boardId)))
      ),
    { dispatch: false }
  );
}
