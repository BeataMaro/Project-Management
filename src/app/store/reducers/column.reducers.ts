import { createReducer, on } from '@ngrx/store';
import { BoardsStateInterface } from './board.reducers';
import { initialState } from './board.reducers';
import { ICol, IColumn } from '../../shared/models/column.model';
import {
  getColumnsSuccess,
  getColumnsFailure,
  getColumns,
  addColumn,
  deleteColumn,
} from '../actions/column.actions';

// export interface ColumnsStateInterface {
//   isLoading: boolean;
//   column: ICol;
//   error: string | null;
//   columnId?: string;
//   boardId: string;
// }

// export const colInitialState: ColumnsStateInterface = {
//   isLoading: false,
//   column: { title: '', order: 0 },
//   error: null,
//   boardId: '',
// };

export const columnsReducers = createReducer(
  initialState,
  on(getColumns, (state) => ({
    ...state,
    isLoading: false,
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
     column: action.column,

    // ...state.boards.find((board) => board._id === action.boardId)?.columns?.push(action.column),
    // ...state.boards.columns

    boardId: action.boardId,
  }))
);
