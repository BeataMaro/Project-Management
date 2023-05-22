import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/user-login/service/auth.service';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailed,
  addUserSuccess,
  addUserFailure,
  updateUser,
  deleteUser,
  getUsersFailure,
  loginUser,
} from './users-actions';
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
      ofType(loadUsers),
      switchMap(() =>
        this.authService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError(() => of(loadUsersFailed()))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserSuccess),
      switchMap(({ user }) =>
        this.authService.signUp(user).pipe(
          map((user) => addUserSuccess({ user })),
          catchError((e) => of(addUserFailure({ error: e.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ userId }) =>
        this.authService.deleteUser(userId).pipe(
          map(() => deleteUser({ userId })),
          catchError((error) => of(getUsersFailure({ error: error.message })))
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(
        ({login}) =>
          this.authService
            .logIn(login!)
            .pipe(map(({ token }) => loginUser({ token })))
        //   this.authService.logIn({ login, password}).pipe(
        //   map(({ token }) =>  token ? loginUser({ isLoggedIn: true}) : loginUser({ isLoggedIn: false}) ))
        // )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      // switchMap(({ userId, name, login, password }) =>
      //   this.authService.updateUser( userId, {'name': name, 'login': login, 'password': password }).pipe(
      //     map(({ userId, name, login, password }) => UsersActions.updateUser({ 'userId' : userId, 'name': name, 'login': login, 'password': password })),
      //     catchError(() => of(UsersActions.loadUsersFailed()))
      //   )
      // )
      switchMap(({ user }) =>
        this.authService.updateUser(user).pipe(
          map(({ login, name, password }) =>
            updateUser({
              user: { name, login, password },
            })
          )
        )
      )
    )
  );
}
