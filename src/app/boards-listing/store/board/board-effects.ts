import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './board-reducers';
import * as BoardsActions from './board-actions';
import { BoardsService } from '../../service/boards.service';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.BoardsStateInterface>,
    private boardsService: BoardsService
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.getBoards),
      mergeMap(() =>
        this.boardsService.getAllBoards().pipe(
          map((boards) => BoardsActions.getBoardsSuccess({ boards })),
          catchError((error) =>
            of(BoardsActions.getBoardsFailure({ error: error.message }))
          )
        )
      )
    )
  );
  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      mergeMap(({ boardId }) =>
        this.boardsService.deleteBoard(boardId).pipe(
          map(() => BoardsActions.deleteBoard({ boardId })),
          catchError((error) =>
            of(BoardsActions.getBoardsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
