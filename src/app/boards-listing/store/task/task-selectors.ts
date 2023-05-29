import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksStateInterface } from './task-reducers';


export const selectFeature = createFeatureSelector<TasksStateInterface>('tasks')
// export const isLoadingSelector = createSelector(
//   selectFeature,
//   (state: TasksStateInterface) => state.isLoading
// );

export const TasksSelector = createSelector(
    selectFeature,
    (state: TasksStateInterface) => state.tasks
  );

  export const ErrorSelector = createSelector(
    selectFeature,
    (state: TasksStateInterface) => state.error
  );
  export const BoardIdSelector = createSelector(
    selectFeature,
    (state: TasksStateInterface) => state.boardId
  );