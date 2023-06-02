import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStateInterface } from './users.reducer';

export const selectFeature = createFeatureSelector<UsersStateInterface>('users');
export const isLoggedInSelector = createSelector(
  selectFeature,
  (state: UsersStateInterface) => state.isLoggedIn
);
export const usersSelector = createSelector(
  selectFeature,
  (state: UsersStateInterface) => state.users
);

