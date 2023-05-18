import { createReducer, on } from '@ngrx/store';
import { Iboard } from 'src/app/shared/models/board.model';
import * as BoardsActions from './board-actions';
import { IColumn } from 'src/app/shared/models/column.model';

export interface BoardsStateInterface {
  isLoading: boolean;
  boards: Iboard[];
  error: string | null;
  columns?: IColumn[];
  boardId?: string;
}

const initialState: BoardsStateInterface = {
  isLoading: false,
  boards: [],
  error: null,
  columns: []
};

export const boardsReducers = createReducer(
  initialState,
  on(BoardsActions.getBoards, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(BoardsActions.getBoardsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    boards: action.boards,
  })),
  on(BoardsActions.getBoardsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(BoardsActions.deleteBoard, (state, action) => ({
    ...state,
    isLoading: false,
    boardId: action.boardId,
  })),
  on(BoardsActions.addBoard, (state, action) => ({
    ...state,
    isLoading: false,
    board: action.board,
  })),
  on(BoardsActions.getColumns, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(BoardsActions.getColumnsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    columns: action.columns,
  })),
  on(BoardsActions.getColumnsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
