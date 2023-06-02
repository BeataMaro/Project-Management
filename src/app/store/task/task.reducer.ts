import { createReducer, on } from '@ngrx/store';
import { Itask } from 'src/app/shared/models/task.model';
import { getTasks, getTasksSuccess, getTasksFailure, deleteTask } from './task.actions';

export interface TasksStateInterface {
  isLoading: boolean;
  tasks: Itask[];
  error: string | null;
  boardId?: string,
  columnsId?: string
}

export const initialTasksState: TasksStateInterface = {
  isLoading: false,
  tasks: [],
  error: null,
};

export const tasksReducer = createReducer(initialTasksState, on(getTasks, (state) => ({
    ...state,
    isLoading: true
}) ),
on(getTasksSuccess, (state, action) => ({
  ...state,
  isLoading: false,
  boardId: action.boardId,
  columnId: action.columnId,
  tasks: [...action.tasks]
}) ),
on(getTasksFailure, (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error
}) ),
on(deleteTask, (state, action) => ({
  ...state,
  isLoading: false,
  boardId: action.boardId,
  columnId: action.columnId,
  taskId: action.taskId
}) ),
);
