import { AnyAction } from 'redux';

// redux
import { ActionName } from './user.types';

export const setUserTokenAction = (token: string): AnyAction => ({
  type: ActionName.SET_TOKEN,
  payload: token,
});
