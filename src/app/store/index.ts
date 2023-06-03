import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppStateInterface } from './app.store';
import { AppReducer } from './app.reducer';

export const reducers: ActionReducerMap<AppStateInterface> = {
  appState: AppReducer,
};
export const metaReducers: MetaReducer<AppStateInterface>[] = [];
