import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './column-reducers';
import * as ColumnsActions from './column-actions';
import { BoardsService } from '../../service/boards.service';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.ColumnsStateInterface>,
    private boardsService: BoardsService
  ) {}

  // fetchColumns$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ColumnsActions.getColumns),
  //     mergeMap(() =>
  //       this.boardsService.getAllColumns().pipe(
  //         map(() => ColumnsActions.getColumnsSuccess()),
  //         catchError((error) =>
  //           of(ColumnsActions.getColumnsFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );
  // deleteColumn$ = createEffect(() => this.actions$.pipe(ofType(ColumnsActions.deleteColumn),
  // mergeMap(() =>
  // this.boardsService.
  // )
  // ))
}
