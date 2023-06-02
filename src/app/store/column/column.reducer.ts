import { createReducer, on } from '@ngrx/store';
import { IColumn } from 'src/app/shared/models/column.model';
import {
  getColumnsSuccess,
  getColumnsFailure,
  getColumns,
  addColumn,
  deleteColumn,
} from './column.actions';

export interface ColumnsStateInterface {
  isLoading: boolean;
  columns: IColumn[];
  error: string | null;
}

export const initialColState: ColumnsStateInterface = {
  isLoading: true,
  columns: [],
  error: null,
};

export const columnsReducer = createReducer(
  initialColState,
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
  on(getColumnsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(addColumn, (state, { boardId, column }) => ({
    ...state,
    column,
    boardId,

    // ...state.boards.find((board) => board._id === action.boardId)?.columns?.push(action.column),
    // ...state.boards.columns
  })),
  on(deleteColumn, (state, action) => ({
    ...state,
    isLoading: false,
    columnId: action.columnId,
    boardId: action.boardId,
  }))
);

// on(getColumnsSuccess, (state, { columns, boardId }) => ({
//   ...state,
//   isLoading: false,

//     boards: [
//       ...state.boards,
//       const board = state.boards.find((board) => {
//         board._id === boardId).columns
//       }
//       = [ ...board.columns, ...columns}]
//     ],
// )),

// on(addColumn, (state, { column, boardId }) => {
//   // let currentBoard = state.boards.find((board) => board._id === boardId);
//   // currentBoard!.columns = [...currentBoard!.columns!, column];
//   // let filteredBoards = state.boards.filter((board) => board._id !== boardId);
//   return {
//     ...state,
//     isLoading: false,
//     // columns: [...state.columns!, ]
//   };
// });
