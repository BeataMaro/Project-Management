import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppStateInterface } from './app.store';
import { AppReducer } from './app.reducer';
import { usersReducer } from '../user/store/users/users.reducer';
import { boardsReducer } from '../boards-listing/store/board/board.reducer';
import { columnsReducer } from '../boards-listing/store/column/column.reducer';
import { tasksReducers } from '../boards-listing/store/task/task.reducer';

export const reducers: ActionReducerMap<AppStateInterface> = {
 appState: AppReducer, 
 users: usersReducer,
 boards: boardsReducer,
 columns: columnsReducer,
 tasks: tasksReducers
};
export const metaReducers: MetaReducer<AppStateInterface>[] = [];