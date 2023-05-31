import { Iboard } from './board.model';
import { IColumn } from './column.model';
import { Itask } from './task.model';
import { Iuser } from './user.model';

export interface Iapp {
  isLoading: boolean;
  users?: Iuser[];
  boards?: Iboard[];
  columns?: IColumn[];
  tasks?: Itask[];
  isLogged?: boolean;
  userId?: string;
  boardId?: string;
  columnId?: string;
  error?: string;
  token?: string;
}

export interface AppStateInterface {
  AppState: Iapp;
}

export const initialAppState: Iapp = {
  // users: [],
  // boards: [],
  // columns: [],
  // tasks: [],
  isLoading: true,
  isLogged: false,
}
