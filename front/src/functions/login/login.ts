import { Dispatch, FormEvent, SetStateAction } from 'react';
import Router from 'next/router';

// components
import { fillAndOpenModalContent } from 'components/Modal/Modal';
import { ModalTypes } from 'components/Modal/modal.enum';
import { IModal } from 'components/Modal/Modal.interface';

// redux
import { AnyAction } from 'redux';
import { setUserTokenAction } from 'redux/user/user.actions';

// enums
import { ApiHeader, ApiMethod, ApiResponseCode } from 'enums/protocol.enum';

// helpers
import { Endpoint } from 'helpers/endpoints';
import { checkPasswordLength } from 'helpers/utils';

// interfaces
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
    usernameOrEmail: '',
    password: '',
  });
};

export const onRegisterButtonClick = (event: MouseEvent) => {
  event.preventDefault();
  Router.push(Endpoint.routes.REGISTER);
};

export const isUserInfosValid = (userInfos: UserInfosLogin) => {
  const { usernameOrEmail, password } = userInfos;
  return !usernameOrEmail || !password;
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
    body: JSON.stringify(
      userInfos.usernameOrEmail.includes('@')
        ? {
            email: userInfos.usernameOrEmail,
            password: userInfos.password,
          }
        : {
            username: userInfos.usernameOrEmail,
            password: userInfos.password,
          },
    ),
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
  setIsButtonDisabled: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    event.preventDefault();
    setIsButtonDisabled(true);
    checkUserInfos(userInfos);
    const { code, token, message } = await submitLoginFormUserInfos(
      userInfos,
      setUserInfos,
    );
    ApiResponseHandler(code, message, setIsModalOpen, setModalContent);
    if (token) {
      dispatch(setUserTokenAction(token));
    }
    setIsButtonDisabled(false);
  } catch (error: any) {
    setIsButtonDisabled(false);
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
