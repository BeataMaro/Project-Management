import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppStateInterface } from './app.store';
import { AppReducer } from './app.reducer';
import { usersReducer } from '../user/store/users/users.reducer';
import { boardsReducer } from './board/board.reducer';
import { columnsReducer } from './column/column.reducer';
import { tasksReducer } from './task/task.reducer';

export const reducers: ActionReducerMap<AppStateInterface> = {
  appState: AppReducer,
  users: usersReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
};
export const metaReducers: MetaReducer<AppStateInterface>[] = [];
