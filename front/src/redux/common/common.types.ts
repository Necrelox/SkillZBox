export enum ActionName {
  SET_ERROR = 'SET_ERROR',
  REMOVE_ERROR = 'REMOVE_ERROR',
  SET_BASE_URL = 'SET_BASE_URL',
}

interface SetErrorAction {
  type: typeof ActionName.SET_ERROR;
  payload: {
    error: string;
    actionName: string;
  };
}

interface RemoveErrorAction {
  type: typeof ActionName.REMOVE_ERROR;
  payload: string;
}

interface SetBaseUrlAction {
  type: typeof ActionName.SET_BASE_URL;
  payload: string;
}

export type CommonActionTypes =
  | SetErrorAction
  | RemoveErrorAction
  | SetBaseUrlAction;
