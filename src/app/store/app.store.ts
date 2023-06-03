export interface IApp {
  isLoading?: boolean;
  isLogged?: boolean;
  error?: string | null;
}

export interface AppStateInterface {
  appState: IApp;
}

export const initialAppState: IApp = {
  isLoading: true,
  isLogged: false,
  error: null,
};
