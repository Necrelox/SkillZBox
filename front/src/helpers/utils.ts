import { AnyAction, Dispatch } from 'redux';

// enums
import { ApiHeader, ApiMethod } from 'enums/protocol.enum';

// redux
import { CommonState } from 'redux/common/common.reducer';
import { setUserTokenAction } from 'redux/user/user.actions';

// helpers
import { Endpoint } from 'helpers/endpoints';

export const checkPasswordLength = (password: string) => {
  return password.length >= 8;
};

export const hasUppercaseInPassword = (password: string) => {
  return password.toLowerCase() !== password;
};

export const hasLowercaseInPassword = (password: string) => {
  return password.toUpperCase() !== password;
};

export const hasNumberInPassword = (password: string) => {
  const regex: RegExp = /\d/g;
  return regex.test(password);
};

export const comparePassword = (
  firstPassword: string,
  secondPassword: string,
) => {
  return firstPassword === secondPassword;
};

export const storeUserToken = (token: string) => {
  localStorage.setItem('USER_TOKEN', token);
};

export const getUserToken = () => {
  return localStorage.getItem('USER_TOKEN');
};

export const getUserData = async (
  common: CommonState,
  dispatch: Dispatch<AnyAction>,
) => {
  const userToken = getUserToken();

  if (userToken) {
    const response = await fetch(`${common.baseURL}${Endpoint.local.USER.ME}`, {
      method: ApiMethod.GET,
      headers: {
        [ApiHeader.CONTENT_TYPE]: ApiHeader.APPLICATION_JSON,
        [ApiHeader.AUTHORIZATION]: `Bearer ${userToken}`,
      },
    });

    const data = await response.json();
    if (data.content?.message === 'Token expired.') {
      throw new Error('Token expired.');
    }

    dispatch(setUserTokenAction(userToken));
    const { username, email, activityMessage, isConnected } = data.user;

    return {
      username,
      email,
      activityMessage,
      isConnected,
    };
  }
};
