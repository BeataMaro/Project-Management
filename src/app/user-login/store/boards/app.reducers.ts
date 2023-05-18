// import { createReducer, on } from '@ngrx/store';

// import { getBoards, getBoardsSuccess, getBoardsFailure } from './app-actions';
// import { BoardsStateInterface } from 'src/app/boards-listing/store/board/board-reducers';
// import { UsersState } from '../users/users-reducers';

// export interface AppStateInterface {
//   boards: BoardsStateInterface;
//   users?: UsersState;
// }

// const initialAppState: AppStateInterface = {
//   boards: { isLoading: true, error: null },
// };

// export const appReducers = createReducer(
//   initialAppState,
//   on(getBoards, (state) => ({
//     ...state,
//     isLoading: true,
//   })),
//   on(getBoardsSuccess, (state, action) => ({
//     ...state,
//     isLoading: false,
//   })),
//   on(getBoardsFailure, (state, action) => ({
//     ...state,
//     isLoading: false,
//     error: action.error,
//   }))
// );
