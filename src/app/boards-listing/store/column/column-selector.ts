import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsStateInterface } from '../board/board-reducers';
// import { ColumnsStateInterface } from './column-reducers';
import { UsersState } from 'src/app/user-login/store/users/users-reducers';
import { Iboard } from 'src/app/shared/models/board.model';

// export interface AppStateInterface {
//   boards: BoardsStateInterface;
//   columns: ColumnsStateInterface;
//   users: UsersState;
// }

export const selectFeature =
  createFeatureSelector<BoardsStateInterface>('columns');
// export const isLoadingSelector = createSelector(
//   selectFeature,
//   (state: BoardsStateInterface) => state.isLoading
// );

export const ColumnsSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) => state.boards
);

export const ErrorSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) => state.error
);
export const ColumnIdSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) =>
    state.boards.map((board: Iboard) => board.columns)
);
