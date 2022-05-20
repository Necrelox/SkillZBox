import { Dispatch, FormEvent, SetStateAction } from 'react';
import Router from 'next/router';

// components
import { fillAndOpenModalContent } from 'components/Modal/Modal';

// redux
import { AnyAction } from 'redux';
import { setUserTokenAction } from 'redux/user/user.actions';

// enums
import { ModalTypes } from 'enums/modal.enum';
import { ApiHeader, ApiMethod, ApiResponseCode } from 'enums/protocol.enum';

// helpers
import { Endpoint } from 'helpers/endpoints';
import { checkPasswordLength } from 'helpers/utils';

// interfaces
import { IModal } from 'interfaces/Modal.interface';
import { UserInfosLogin } from 'interfaces/UserInfos.interface';

export const userInfosHandler = (
  event: FormEvent<HTMLInputElement>,
  setUserInfos: Dispatch<SetStateAction<UserInfosLogin>>,
) => {
  const { value, name } = event.currentTarget;
  setUserInfos((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const resetUserInfos = (
  setUserInfos: Dispatch<SetStateAction<UserInfosLogin>>,
) => {
  setUserInfos({
    username: '',
    password: '',
  });
};

export const onRegisterButtonClick = (event: MouseEvent) => {
  event.preventDefault();
  Router.push(Endpoint.routes.REGISTER);
};

export const isUserInfosValid = (userInfos: UserInfosLogin) => {
  const { username, password } = userInfos;
  return !username || !password;
};

export const checkUserInfos = (userInfos: UserInfosLogin) => {
  if (isUserInfosValid(userInfos)) {
    throw new Error('Veuillez remplir tous les champs');
  }

  if (!checkPasswordLength(userInfos.password)) {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères');
  }
};

export const submitLoginFormUserInfos = async (
  userInfos: UserInfosLogin,
  setUserInfos: Dispatch<SetStateAction<UserInfosLogin>>,
) => {
  const response = await fetch(Endpoint.local.LOGIN, {
    method: ApiMethod.POST,
    headers: {
      [ApiHeader.CONTENT_TYPE]: ApiHeader.APPLICATION_JSON,
    },
    body: JSON.stringify(userInfos),
  });
  const { content } = await response.json();

  resetUserInfos(setUserInfos);

  if (!content.code || (!content.message && !content.token)) {
    throw new Error("Une erreur s'est produite lors de l'authentification");
  }

  return content;
};

export const ApiResponseHandler = (
  code: string,
  message: string,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setModalContent: Dispatch<SetStateAction<IModal>>,
) => {
  fillAndOpenModalContent(
    {
      message: message,
      type: code === ApiResponseCode.OK ? ModalTypes.SUCCESS : ModalTypes.ERROR,
    },
    setIsModalOpen,
    setModalContent,
  );
};

export const submitLoginForm = async (
  event: FormEvent,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setModalContent: Dispatch<SetStateAction<IModal>>,
  setUserInfos: Dispatch<SetStateAction<UserInfosLogin>>,
  userInfos: UserInfosLogin,
  dispatch: Dispatch<AnyAction>,
) => {
  try {
    event.preventDefault();
    checkUserInfos(userInfos);
    const { code, token, message } = await submitLoginFormUserInfos(
      userInfos,
      setUserInfos,
    );
    ApiResponseHandler(code, message, setIsModalOpen, setModalContent);
    if (token) {
      dispatch(setUserTokenAction(token));
    }
  } catch (error: any) {
    fillAndOpenModalContent(
      {
        message: error.message,
        type: ModalTypes.ERROR,
      },
      setIsModalOpen,
      setModalContent,
    );
  }
};
