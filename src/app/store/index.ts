import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppStateInterface } from '../shared/models/app.model';
import { AppReducer } from './reducers/app.reducers';

export const reducers: ActionReducerMap<AppStateInterface> = {
  AppState: AppReducer,
};
export const metaReducers: MetaReducer<AppStateInterface>[] = [];