import { createReducer, on } from '@ngrx/store';
import { Iboard } from 'src/app/shared/models/board.model';
import * as BoardsActions from './board-actions';
import { ICol, IColumn } from 'src/app/shared/models/column.model';
// import { ColumnsStateInterface } from '../column/column-reducers';

export interface BoardsStateInterface {
  isLoading: boolean;
  boards: Iboard[];
  error: string | null;
  columns?: ICol[];
  boardId?: string;
}

export const initialState: BoardsStateInterface = {
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
    boards: [...state.boards, board],
  })),
  // on(BoardsActions.editBoard, (state, { boardId, newTitle }) => ({
  on(BoardsActions.editBoard, (state, { board }) => ({
    ...state,
    board
    // ...state.boards.filter((board: Iboard) => board._id !== boardId),
    // ...state.boards.find((board: Iboard) => board._id === boardId )?.title = newTitle
  })),
  on(BoardsActions.getColumns, (state) => ({
    ...state,
    isLoading: true,
  })),
  // on(BoardsActions.getColumnsSuccess, (state, { columns, boardId }) => ({
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
  on(BoardsActions.getColumnsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(BoardsActions.addColumn, (state, { column, boardId }) => {
    // let currentBoard = state.boards.find((board) => board._id === boardId);
    // currentBoard!.columns = [...currentBoard!.columns!, column];
    // let filteredBoards = state.boards.filter((board) => board._id !== boardId);
    return {
      ...state,
      isLoading: false,
      // columns: [...state.columns!, ]      
    };
  })
);
