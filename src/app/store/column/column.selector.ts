import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColumnsStateInterface } from './column.reducer';

export const selectFeature =
  createFeatureSelector<ColumnsStateInterface>('columns');
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
