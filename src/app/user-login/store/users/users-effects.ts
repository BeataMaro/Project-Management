import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/user-login/service/auth.service';
import * as UsersActions from './users-actions';
import * as fromRoot from './users-reducers';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.UsersState>,
    private authService: AuthService
  ) {}

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.authService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError(() => of(UsersActions.loadUsersFailed()))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUserSuccess),
      switchMap(({ user }) =>
        this.authService.signUp(user).pipe(
          map((user) => UsersActions.addUserSuccess({ user }))
          // catchError(() => of(UsersActions.addUserSuccess)),
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ userId }) =>
        this.authService.deleteUser(userId).pipe(
          map(() => UsersActions.deleteUser({ userId }))
          // catchError((error) =>
          //   of(UsersActions.getUsersFailure({ error: error.message }))
          // )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      // switchMap(({ userId, name, login, password }) =>
      //   this.authService.updateUser( userId, {'name': name, 'login': login, 'password': password }).pipe(
      //     map(({ userId, name, login, password }) => UsersActions.updateUser({ 'userId' : userId, 'name': name, 'login': login, 'password': password })),
      //     catchError(() => of(UsersActions.loadUsersFailed()))
      //   )
      // )
      switchMap(({ user }) =>
        this.authService.updateUser(user).pipe(
          map(({ login, name, password }) =>
            UsersActions.updateUser({
              user: { name, login, password },
            })
          ),
          catchError(() => of(UsersActions.loadUsersFailed()))
        )
      )
    )
  );
}
