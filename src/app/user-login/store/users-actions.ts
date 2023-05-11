import { createAction, props } from '@ngrx/store';
import { Ilogin, Isignup, Iuser } from 'src/app/shared/models/user.model';
// import { Ilogin, Iuser } from 'src/app/shared/models/user.model';

export const loadUsers = createAction('[Users] Load Users Success');
export const loadUsersFailed = createAction('[Users] Load Users Failed');

export const loadUsersSuccess = createAction(
  '[Users] Load users Success',
  props<{ users: Ilogin[] }>()
);


export const addUserSuccess = createAction(
    '[Users] Add user Success',
    props<{ user: Ilogin }>()
  );

export const updateUser = createAction(
  '[Users] Update user',
  // props<{ userId: string, name: string, login: string, password: string}>()
  props<{ user: Isignup }>()
)

export const deleteUser = createAction(
  '[Users] Delete user',
  // props<{ userId: string, name: string, login: string, password: string}>()
  props<{ userId: string }>()
)