export enum ActionName {
  SET_TOKEN = 'SET_TOKEN',
}

interface SetUserTokenAction {
  type: typeof ActionName.SET_TOKEN;
  payload: string;
}

export type UserActionTypes = SetUserTokenAction;
