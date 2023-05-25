import { createAction, props } from '@ngrx/store';
import { Itask } from 'src/app/shared/models/task.model';


export const getTasks = createAction('[Task] Get Tasks');
export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ boardId: string, columnId: string, tasks: Itask[] }>()
);
export const getTasksFailure = createAction(
  '[Task] Get Tasks Failure',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardId: string, columnId: string, taskId: string }>()
);
