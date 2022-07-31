// redux
import { UserData } from './interfaces/user.interface';
import { ActionName, UserActionTypes } from './user.types';

export interface UserState extends UserData {
  token: string;
}

export const initialState: UserState = {
  token: '',
  username: '',
  email: '',
  activityMessage: '',
  isConnected: false,
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case ActionName.SET_TOKEN:
      return { ...state, token: action.payload };

    case ActionName.SET_USER_DATA:
      return { ...state, ...action.payload };

    default:
      return { ...state };
  }
};

export default userReducer;
