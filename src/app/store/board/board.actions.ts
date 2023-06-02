import { createAction, props } from '@ngrx/store';
import { Iboard } from 'src/app/shared/models/board.model';

export const getBoards = createAction('[Board] Get Boards');
export const getBoardsSuccess = createAction(
  '[Board] Get Boards Success',
  props<{ boards: Iboard[] }>()
);
export const getBoardsFailure = createAction(
  '[Board] Get Boards Failure',
  props<{ error: string }>()
);

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ boardId: string }>()
);

export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: Iboard }>()
);

export const editBoard = createAction(
  '[Board] Edit Board',
  // props<{ boardId: string; newTitle: string }>()
  props<{ board: Iboard }>()
);
