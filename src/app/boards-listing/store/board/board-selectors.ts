import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from 'src/app/user-login/store/users-reducers';
import { BoardsStateInterface } from './board-reducers';

export interface AppStateInterface {
    boards: BoardsStateInterface,
    users: UsersState
}

export const selectFeature = createFeatureSelector<BoardsStateInterface>('boards')
export const isLoadingSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) => state.isLoading
);

export const BoardsSelector = createSelector(
    selectFeature,
    (state: BoardsStateInterface) => state.boards
  );

  export const ErrorSelector = createSelector(
    selectFeature,
    (state: BoardsStateInterface) => state.error
  );
  export const BoardIdSelector = createSelector(
    selectFeature,
    (state: BoardsStateInterface) => state.boardId
  );