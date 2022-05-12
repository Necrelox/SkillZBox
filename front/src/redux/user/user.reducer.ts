// redux
import { ActionName, UserActionTypes } from './user.types';

interface UserState {
  token: string;
}

export const initialState: UserState = {
  token: '',
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case ActionName.SET_TOKEN:
      return { ...state, token: action.payload };

    default:
      return { ...state };
  }
};

export default userReducer;
