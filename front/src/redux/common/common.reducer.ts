// redux
import { ActionName, CommonActionTypes } from './common.types';
import { Error } from './interfaces/error.interface';

export interface CommonState {
  errors: Error[];
  baseURL: string;
}

export const initialState: CommonState = {
  errors: [],
  baseURL: '',
};

export const commonReducer = (
  state = initialState,
  action: CommonActionTypes,
): CommonState => {
  switch (action.type) {
    case ActionName.SET_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors.filter(
            ({ actionName }) => actionName !== action.payload.actionName,
          ),
          {
            error: action.payload.error,
            actionName: action.payload.actionName,
          },
        ],
      };

    case ActionName.REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.filter(
          ({ actionName }) => actionName !== action.payload,
        ),
      };

    case ActionName.SET_BASE_URL:
      return { ...state, baseURL: action.payload };

    default:
      return { ...state };
  }
};

export default commonReducer;
