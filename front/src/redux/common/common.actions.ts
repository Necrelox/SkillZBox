import { AnyAction } from 'redux';

// redux
import { AsyncAction } from 'redux/store';
import { ActionName } from './common.types';
import { AnyActionParam } from './interfaces/common.interface';
import { Error } from './interfaces/error.interface';

export const setErrorAction = (actionName: string, error: Error): AnyAction => {
  return {
    type: ActionName.SET_ERROR,
    payload: {
      error: JSON.stringify(error),
      actionName: actionName,
    },
  };
};

export const removeErrorAction = (actionName: string): AnyAction => ({
  type: ActionName.REMOVE_ERROR,
  payload: actionName,
});

export const anyAction =
  ({ type, payload }: AnyActionParam): AsyncAction =>
  async (dispatch, getState) => {
    const { common } = getState();

    if (common.errors.find(({ actionName }) => actionName === type)) {
      dispatch(removeErrorAction(type));
    }

    return dispatch({
      type,
      payload,
    });
  };

export const setBaseUrlAction = (baseURL: string): AnyAction => ({
  type: ActionName.SET_BASE_URL,
  payload: baseURL,
});
