import {
  BoardsStateInterface,
  initialBoardsState,
} from '../boards-listing/store/board/board.reducer';
import { IColumn } from '../shared/models/column.model';
import { Itask } from '../shared/models/task.model';
import {
  UsersStateInterface,
  initialUsersState,
} from '../user/store/users/users.reducer';

export interface IApp {
  boards: BoardsStateInterface;
  users: UsersStateInterface;
  columns?: IColumn[];
  tasks?: Itask[];
  isLoading?: boolean;
  isLogged: boolean;
  error?: string | null
  boardId?: string
}

export interface AppStateInterface {
  AppState: IApp;
}

export const initialAppState: IApp = {
  boards: initialBoardsState,
  users: initialUsersState,
  isLoading: true,
  isLogged: false,

};
