import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppStateInterface, IApp } from './app.store';
import { AppReducer } from './app.reducer';

export const reducers: ActionReducerMap<AppStateInterface> = {
// export const reducers: ActionReducerMap<IApp> = {
 AppState: AppReducer 
};
// export const metaReducers: MetaReducer<AppStateInterface>[] = [];
export const metaReducers: MetaReducer<AppStateInterface>[] = [];