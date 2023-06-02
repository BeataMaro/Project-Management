import {
  BoardsStateInterface,
  initialBoardsState,
} from './board/board.reducer';
import { initialColState } from './column/column.reducer';
import { ColumnsStateInterface } from './column/column.reducer';
import { TasksStateInterface, initialTasksState } from './task/task.reducer';
import {
  UsersStateInterface,
  initialUsersState,
} from '../user/store/users/users.reducer';

export interface IApp {
  isLoading?: boolean;
  isLogged?: boolean;
  error?: string | null;
}

export interface AppStateInterface {
  appState: IApp;
  users: UsersStateInterface;
  boards: BoardsStateInterface;
  columns: ColumnsStateInterface;
  tasks: TasksStateInterface;
}

export const initialAppState: AppStateInterface = {
  appState: {
    isLoading: true,
    isLogged: false,
    error: null,
  },
  users: initialUsersState,
  boards: initialBoardsState,
  columns: initialColState,
  tasks: initialTasksState,
};
