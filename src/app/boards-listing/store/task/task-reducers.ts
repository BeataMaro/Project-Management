import { createReducer, on } from '@ngrx/store';
import { Itask } from 'src/app/shared/models/task.model';
import * as TasksActions from './task-actions';

export interface TasksStateInterface {
  isLoading: boolean;
  tasks: Itask[];
  error: string | null;
  boardId?: string,
}

const initialState: TasksStateInterface = {
  isLoading: false,
  tasks: [],
  error: null,
};

export const boardsReducers = createReducer(initialState, on(TasksActions.getTasks, (state) => ({
    ...state,
    isLoading: true
}) ),
on(TasksActions.getTasksSuccess, (state, action) => ({
  ...state,
  isLoading: false,
  boardId: action.boardId,
  columnId: action.columnId
}) ),
on(TasksActions.getTasksFailure, (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error
}) ),
on(TasksActions.deleteTask, (state, action) => ({
  ...state,
  isLoading: false,
  boardId: action.boardId,
  columnId: action.columnId,
  taskId: action.taskId
}) ),
);
