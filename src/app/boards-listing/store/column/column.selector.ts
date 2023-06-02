import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsStateInterface } from '../board/board.reducer';
// import { ColumnsStateInterface } from './column-reducers';
import { UsersStateInterface } from 'src/app/user/store/users/users.reducer';
import { Iboard } from 'src/app/shared/models/board.model';
import { AppStateInterface } from 'src/app/store/app.store';

// export interface AppStateInterface {
//   boards: BoardsStateInterface;
//   columns: ColumnsStateInterface;
//   users: UsersState;
// }

export const selectFeature =
  createFeatureSelector<AppStateInterface>('columns');
// export const isLoadingSelector = createSelector(
//   selectFeature,
//   (state: BoardsStateInterface) => state.isLoading
// );

export const ColumnsSelector = createSelector(
  selectFeature,
  (state: AppStateInterface) => state.AppState.boards
);

export const ErrorSelector = createSelector(
  selectFeature,
  (state: AppStateInterface) => state.AppState.error
);
export const ColumnIdSelector = createSelector(
  selectFeature,
  (state: AppStateInterface) => state.AppState.columns?.map((col) => col._id)
  // state.AppState.boards!.map((board: Iboard) => board.columns)
);
