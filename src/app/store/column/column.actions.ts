import { createAction, props } from '@ngrx/store';
import { ICol, IColumn } from 'src/app/shared/models/column.model';

export const getColumns = createAction(
  '[Column] Get Columns',
  props<{ boardId: string }>()
);

export const getColumnsSuccess = createAction(
  '[Column] Get Columns Success',
  props<{ columns: IColumn[]; boardId: string }>()
);
export const getColumnsFailure = createAction(
  '[Column] Get Columns Failure',
  props<{ error: string }>()
);
export const addColumn = createAction(
  '[Column] Add Column',
  props<{ column: ICol; boardId: string }>()
);
export const deleteColumn = createAction(
  '[Column] Delete Column',
  props<{ columnId: string; boardId: string }>()
);
