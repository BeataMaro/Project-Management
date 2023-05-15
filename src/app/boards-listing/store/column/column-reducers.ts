import { createReducer, on } from '@ngrx/store';
import { IColumn } from '../../../../app/shared/models/column.model';
import {
  getColumnsSuccess,
  getColumnsFailure,
  getColumns,
  addColumn,
  deleteColumn,
} from './column-actions';

export interface ColumnsStateInterface {
  isLoading: boolean;
  columns: IColumn[];
  error: string | null;
  columnId?: string;
  boardId: string;
}

const initialState: ColumnsStateInterface = {
  isLoading: false,
  columns: [],
  error: null,
  boardId: '',
};

export const columnsReducers = createReducer(
  initialState,
  on(getColumns, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getColumnsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    columns: action.columns,
    boardId: action.boardId,
  })),
  on(getColumnsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(deleteColumn, (state, action) => ({
    ...state,
    isLoading: false,
    columnId: action.columnId,
    boardId: action.boardId,
  })),
  on(addColumn, (state, action) => ({
    ...state,
    isLoading: false,
    column: { title: action.title, order: action.order },
  }))
);
