import { createAction, props } from '@ngrx/store';
import { Icolumn } from 'src/app/shared/models/column.model';

export const getColumns = createAction('[Column] Get Columns');
export const getColumnsSuccess = createAction(
  '[Column] Get Columns Success',
  props<{ boardId: string, columns: Icolumn[] }>()
);
export const getColumnsFailure = createAction(
  '[Column] Get Columns Failure',
  props<{ error: string }>()
);

export const deleteColumn = createAction(
  '[Column] Delete Column',
  props<{ columnId: string }>()
);
