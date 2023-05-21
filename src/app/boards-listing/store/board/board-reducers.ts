import { createReducer, on } from '@ngrx/store';
import { Iboard } from 'src/app/shared/models/board.model';
import * as BoardsActions from './board-actions';
import { IColumn } from 'src/app/shared/models/column.model';

export interface BoardsStateInterface {
  isLoading: boolean;
  boards: Iboard[];
  error: string | null;
  // columns?: IColumn[];
  boardId?: string;
}

const initialState: BoardsStateInterface = {
  isLoading: false,
  boards: [],
  // columns: [],
  error: null,
};

export const boardsReducers = createReducer(
  initialState,
  on(BoardsActions.getBoards, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(BoardsActions.getBoardsSuccess, (state, { boards }) => ({
    ...state,
    isLoading: false,
    boards,
  })),
  on(BoardsActions.getBoardsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(BoardsActions.deleteBoard, (state, { boardId }) => ({
    ...state,
    isLoading: false,
    boardId,
  })),
  on(BoardsActions.addBoard, (state, { board }) => ({
    ...state,
    isLoading: false,
    board,
  })),
  on(BoardsActions.getColumns, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(BoardsActions.getColumnsSuccess, (state, { columns }) => ({
    ...state,
    isLoading: false,
    columns

  })),
  on(BoardsActions.getColumnsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(BoardsActions.addColumn, (state, { column }) => ({
    ...state,
    isLoading: false,
    column
  })),
);
