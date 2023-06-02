import { createAction, props } from '@ngrx/store';
// import { Iboard } from 'src/app/shared/models/board.model';
import { Ilogin, Isignup, Iuser } from 'src/app/shared/models/user.model';

export const loadUsers = createAction('[Users] Load Users Success');
export const loadUsersFailed = createAction('[Users] Load Users Failed');

export const loadUsersSuccess = createAction(
  '[Users] Load users Success',
  props<{ users: Ilogin[] }>()
);

export const getUsers = createAction('[Users] Get Users');

export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: Iuser[] }>()
);
export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: string }>()
);
export const loginUser = createAction(
  '[Users] Login User',
  props<{ login?: Ilogin, token?: string }>()
);
export const logoutUser = createAction(
  '[Users] Logout User',
);

export const addUserSuccess = createAction(
  '[Users] Add user Success',
  props<{ user: Ilogin }>()
);
export const addUserFailure = createAction(
  '[Users] Add user Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Users] Update user',
  // props<{ userId: string, name: string, login: string, password: string}>()
  props<{ user: Isignup }>()
);

export const deleteUser = createAction(
  '[Users] Delete user',
  // props<{ userId: string, name: string, login: string, password: string}>()
  props<{ userId: string }>()
);
