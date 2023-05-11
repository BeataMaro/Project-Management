import { createReducer, on } from '@ngrx/store';
import { Iboard } from 'src/app/shared/models/board.model';
import * as BoardsActions from './board-actions';

export interface BoardsStateInterface {
  isLoading: boolean;
  boards: Iboard[];
  error: string | null;
  boardId?: string;
}

const initialState: BoardsStateInterface = {
  isLoading: false,
  boards: [],
  error: null,
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
  }))
);
