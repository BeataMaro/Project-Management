import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardsStateInterface } from './board.reducer';
import { BoardsService } from '../../service/boards.service';
import {
  getBoards,
  deleteBoard,
  addBoard,
  editBoard,
  getBoardsFailure,
  getBoardsSuccess,
} from './board.actions';
import { BoardIdSelector, BoardsSelector } from './board.selectors';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<BoardsStateInterface>,
    private boardsService: BoardsService
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBoards),
      switchMap(() =>
        from(this.boardsService.getAllBoards()).pipe(
          map((boards) => {
            console.log(boards);
            return getBoardsSuccess({ boards: boards });
          }),
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

  // updateUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateUser),
  //     switchMap(({ user }) =>
  //       this.authService.updateUser(user).pipe(
  //         map(({ login, name, password }) =>
  //           updateUser({
  //             user: { name, login, password },
  //           })
  //         )
  //       )
  //     )
  //   )
  // );

  // editBoard$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(editBoard),
  //     switchMap(({ board }) =>
  //       this.authService.editBoard(board).pipe(
  //         map(({ title, order, owner, users }) =>
  //           editBoard({
  //             board: { title, order, owner, users },
  //           })
  //         )
  //       )
  //     )
  //   )
  // );

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
}
