import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '../reducers/users.reducers';

export const selectFeature = createFeatureSelector<UsersState>('users');
export const isLoggedInSelector = createSelector(
  selectFeature,
  (state: UsersState) => state.isLoggedIn
);
export const usersSelector = createSelector(
  selectFeature,
  (state: UsersState) => state.users
);

