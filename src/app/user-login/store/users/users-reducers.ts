import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as usersActions from './users-actions';
import { Ilogin } from 'src/app/shared/models/user.model';

export interface UsersState {
  users?: Ilogin[];
}

export const initialState: UsersState = {
    users: [],
  }

export const getUsersState = createFeatureSelector<UsersState>('users');
export const getUsers = createSelector(
  getUsersState,
  (state: UsersState) => state.users
);


export const usersReducer = createReducer(initialState,
    on(usersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users
  })),
    on(usersActions.updateUser, (state, { user }) => ({
      ...state,
      user
    })),
    on(usersActions.deleteUser, (state, { userId }) => ({
      ...state,
      userId
    }))
  );



// export const appReducer = createReducer(
//     initialState,
//     on(appActions.setLoadingState, (state, { isLoading }) => ({
//       ...state,
//       isLoading
//     }))
//   )

