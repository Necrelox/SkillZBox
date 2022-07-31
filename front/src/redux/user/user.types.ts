import { UserData } from "./interfaces/user.interface";

export enum ActionName {
  SET_TOKEN = 'SET_TOKEN',
  SET_USER_DATA = 'SET_USER_DATA',
}

interface SetUserTokenAction {
  type: typeof ActionName.SET_TOKEN;
  payload: string;
}

interface SetUserDataAction {
  type: typeof ActionName.SET_USER_DATA;
  payload: UserData;
}

export type UserActionTypes = SetUserTokenAction | SetUserDataAction;
