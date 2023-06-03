import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsStateInterface } from './board.reducer';

export const selectFeature =
  createFeatureSelector<BoardsStateInterface>('boards');
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
