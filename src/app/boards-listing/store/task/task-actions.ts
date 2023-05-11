import { createAction, props } from '@ngrx/store';


export const getTasks = createAction('[Task] Get Tasks');
export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ boardId: string, columnId: string }>()
);
export const getTasksFailure = createAction(
  '[Task] Get Tasks Failure',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardId: string, columnId: string, taskId: string }>()
);
