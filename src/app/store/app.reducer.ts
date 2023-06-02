import { createReducer, on, Action } from "@ngrx/store";
import { IApp, initialAppState } from "./app.store";
import { loginUser } from "../user/store/users/users.actions";

export const AppReducer = createReducer(initialAppState as IApp, on(loginUser, (state) => ({
    ...state,
    isLoading: false,
    isLogged: true
})));

export function reducer(state: IApp | undefined, action: Action): IApp {
    return AppReducer(state as IApp, action as Action);
  }