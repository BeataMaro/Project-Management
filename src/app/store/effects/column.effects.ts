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
import {
  getColumns,
  addColumn,
  deleteColumn,
  getColumnsSuccess,
  getColumnsFailure,
} from '../actions/column.actions';
import { ColumnsService } from '../../boards-listing/service/columns.service';
import { ColumnsSelector } from '../selectors/column.selector';
import { BoardsStateInterface } from '../reducers/board.reducers';

@Injectable()
export class ColumnsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<BoardsStateInterface>,
    private ColumnsService: ColumnsService
  ) {}

  // fetchColumns$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getColumns),
  //     mergeMap(() =>
  //       this.ColumnsService.getAllColumns(boardId).pipe(
  //         map((columns, boardId) =>
  //           getColumnsSuccess({
  //             columns: columns,
  //             boardId: JSON.stringify(boardId),
  //           })
  //         ),
  //         catchError((error) => of(getColumnsFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );
  // deleteColumn$ = createEffect(() => this.actions$.pipe(ofType(deleteColumn),
  // mergeMap(() =>
  // this.ColumnsService.deleteColumn()
  // )
  // ))

  addColumn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addColumn),
        withLatestFrom(this.store.select(ColumnsSelector)),
        switchMap(([action]) =>
          from(this.ColumnsService.createColumn(action.column.title, action.column.order, action.boardId))
          ),
          // switchMap(([action, boards]) => from(this.ColumnsService.getAllColumns(action.boardId)))

      ),
    { dispatch: false }
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteColumn),
      mergeMap(({ columnId, boardId }) =>
        this.ColumnsService.deleteColumn(columnId, boardId).pipe(
          map(() => deleteColumn({ columnId, boardId })),
          catchError((error) => of(getColumnsFailure({ error: error.message })))
        )
      )
    )
  );
}
