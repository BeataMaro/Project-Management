import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from 'src/app/user-login/store/users-reducers';
import { BoardsStateInterface } from '../board/board-reducers';
import { ColumnsStateInterface } from './column-reducers';

export interface AppStateInterface {
    boards: BoardsStateInterface,
    columns: ColumnsStateInterface,
    users: UsersState
}

export const selectFeature = createFeatureSelector<ColumnsStateInterface>('columns')
export const isLoadingSelector = createSelector(
  selectFeature,
  (state: ColumnsStateInterface) => state.isLoading
);

export const ColumnsSelector = createSelector(
    selectFeature,
    (state: ColumnsStateInterface) => state.columns
  );

  export const ErrorSelector = createSelector(
    selectFeature,
    (state: ColumnsStateInterface) => state.error
  );
  export const BoardIdSelector = createSelector(
    selectFeature,
    (state: ColumnsStateInterface) => state.boardId
  );