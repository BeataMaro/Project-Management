import { createReducer, on, Action } from '@ngrx/store';
import { initialAppState, Iapp } from '../../shared/models/app.model';
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
} from '../actions/users.actions';

export const userFeatureKey = 'AppState';

export const reducer = createReducer(
  initialAppState as Iapp,
  on(loginUser, (state) => ({
    ...state,
  })),
  on(loginUserSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(loginUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function AppReducer(state: Iapp | undefined, action: Action): Iapp {
  return reducer(state as Iapp, action as Action);
}
