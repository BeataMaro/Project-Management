import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loadUsersSuccess, loadUsersFailed, updateUser, deleteUser, isUserLoggedIn} from './users-actions';
import { Ilogin } from 'src/app/shared/models/user.model';

export interface UsersState {
  users?: Ilogin[];
  isLoggedIn: boolean;
}

export const initialState: UsersState = {
    users: [],
    isLoggedIn: false
  }

export const getUsersState = createFeatureSelector<UsersState>('users');
export const getUsers = createSelector(
  getUsersState,
  (state: UsersState) => state.users
);


export const usersReducer = createReducer(initialState,
    on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    isLoggedIn: true,
    users
  })),
    on(updateUser, (state, { user }) => ({
      ...state,
      isLoggedIn: true,
      user
    })),
    on(deleteUser, (state, { userId }) => ({
      ...state,
      isLoggedIn: false,
      userId
    })),
    on(isUserLoggedIn, (state, action) => ({
      ...state,
      isLoggedIn: action.isLoggedIn,
    }))
  );


