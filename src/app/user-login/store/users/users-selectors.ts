import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users-reducers';

export const selectFeature = createFeatureSelector<UsersState>('users');
export const isLoggedInSelector = createSelector(
  selectFeature,
  (state: UsersState) => state.isLoggedIn
);
