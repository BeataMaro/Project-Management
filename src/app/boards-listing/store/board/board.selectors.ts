import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsStateInterface } from './board.reducer';
import { AppStateInterface } from 'src/app/store/app.store';

export const selectFeature = createFeatureSelector<BoardsStateInterface>('boards');
// export const isLoadingSelector = createSelector(
//   selectFeature,
//   (state: AppStateInterface) => state.AppState.boards.isLoading
// );
export const isLoadingSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) => state.isLoading
);

export const BoardsSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) => state.boards
);

// export const ErrorSelector = createSelector(
//   selectFeature,
//   (state: AppStateInterface) => state.AppState.error
// );
// export const BoardIdSelector = createSelector(
//   selectFeature,
//   (state: AppStateInterface) => state.AppState.boardId
// );
export const ErrorSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) => state.error
);
export const BoardIdSelector = createSelector(
  selectFeature,
  (state: BoardsStateInterface) => state.boardId
);
