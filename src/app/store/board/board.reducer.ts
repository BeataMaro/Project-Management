import { createReducer, on } from '@ngrx/store';
import { Iboard } from 'src/app/shared/models/board.model';
import {
  getBoards,
  getBoardsSuccess,
  getBoardsFailure,
  addBoard,
  editBoard,
  deleteBoard,
} from './board.actions';

export interface BoardsStateInterface {
  isLoading?: boolean;
  boards?: Iboard[];
  error?: string | null;
}
export const initialBoardsState: BoardsStateInterface = {
  isLoading: false,
  boards: [],
  error: null,
};

export const boardsReducer = createReducer(
  initialBoardsState,
  on(getBoards, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getBoardsSuccess, (state, { boards }) => ({
    ...state,
    isLoading: false,
    boards: [...boards ],
  })),
  on(getBoardsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(deleteBoard, (state, { boardId }) => ({
    // ...state,
    // isLoading: false,
    // boardId,
    ...state,
    isLoading: false,
    boardId
  })),
  on(addBoard, (state, { board }) => ({
    ...state,
    isLoading: false,
    board,
  })),
  // on(editBoard, (state, { boardId, newTitle }) => ({
  on(editBoard, (state, { board }) => ({
    ...state,
    board,
    // ...state.boards.filter((board: Iboard) => board._id !== boardId),
    // ...state.boards.find((board: Iboard) => board._id === boardId )?.title = newTitle
  }))
);
