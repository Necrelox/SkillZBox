import { AnyAction } from 'redux';

// interface
import { UserData } from './interfaces/user.interface';

// redux
import { ActionName } from './user.types';

export const setUserTokenAction = (token: string): AnyAction => ({
  type: ActionName.SET_TOKEN,
  payload: token,
});

export const setUserDataAction = (userData: UserData): AnyAction => ({
  type: ActionName.SET_USER_DATA,
  payload: userData,
});
