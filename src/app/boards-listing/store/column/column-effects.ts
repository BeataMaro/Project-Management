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
import * as fromRoot from './column-reducers';
import {
  getColumns,
  addColumn,
  deleteColumn,
  getColumnsSuccess,
  getColumnsFailure,
} from './column-actions';
import { ColumnsService } from '../../service/columns.service';
import { ColumnsSelector } from './column-selector';

@Injectable()
export class ColumnsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.ColumnsStateInterface>,
    private ColumnsService: ColumnsService
  ) {}

  fetchColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getColumns),
      mergeMap(() =>
        this.ColumnsService.getAllColumns().pipe(
          map((columns, boardId) =>
            getColumnsSuccess({
              columns: columns,
              boardId: JSON.stringify(boardId),
            })
          ),
          catchError((error) => of(getColumnsFailure({ error: error.message })))
        )
      )
    )
  );
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
          from(this.ColumnsService.createColumn(action.title, action.order, action.boardId))
        )
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
