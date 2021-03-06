import { Dispatch, FormEvent, SetStateAction } from 'react';
import Router from 'next/router';

// components
import { fillAndOpenModalContent } from 'components/Modal/Modal';
import { ModalTypes } from 'components/Modal/modal.enum';
import { IModal } from 'components/Modal/Modal.interface';

// enums
import { ApiHeader, ApiMethod, ApiResponseCode } from 'enums/protocol.enum';

// helpers
import { Endpoint } from 'helpers/endpoints';
import {
  checkPasswordLength,
  hasLowercaseInPassword,
  hasUppercaseInPassword,
  comparePassword,
  hasNumberInPassword,
} from 'helpers/utils';

// interfaces
import { UserInfosRegister } from 'interfaces/UserInfos.interface';

export const userInfosHandler = (
  event: FormEvent<HTMLInputElement>,
  setUserInfos: Dispatch<SetStateAction<UserInfosRegister>>,
) => {
  const { value, name } = event.currentTarget;
  setUserInfos((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const resetUserInfos = (
  setUserInfos: Dispatch<SetStateAction<UserInfosRegister>>,
) => {
  setUserInfos({
    username: '',
    password: '',
    email: '',
    passwordConfirm: '',
  });
};

export const onLoginButtonClick = (event: MouseEvent) => {
  event.preventDefault();
  Router.push(Endpoint.routes.LOGIN);
};

const isUserInfosValid = (userInfos: UserInfosRegister) => {
  const { username, email, password, passwordConfirm } = userInfos;
  return !username || !email || !password || !passwordConfirm;
};

const hasForbidenCharacters = (value: string) => {
  const regex: RegExp = /^\w+$/;
  return !regex.test(value);
};

export const checkUserInfos = (userInfos: UserInfosRegister) => {
  if (isUserInfosValid(userInfos)) {
    throw new Error('Veuillez remplir tous les champs');
  }

  if (hasForbidenCharacters(userInfos.username)) {
    throw new Error(
      "Le nom d'utilisateur ne peut pas contenir de caractères spéciaux",
    );
  }

  if (!checkPasswordLength(userInfos.password)) {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères');
  }

  if (!hasUppercaseInPassword(userInfos.password)) {
    throw new Error('Le mot de passe doit contenir au moins une majuscule');
  }

  if (!hasLowercaseInPassword(userInfos.password)) {
    throw new Error('Le mot de passe doit contenir au moins une minuscule');
  }

  if (!hasNumberInPassword(userInfos.password)) {
    throw new Error('Le mot de passe doit contenir au moins un chiffre');
  }

  if (!comparePassword(userInfos.password, userInfos.passwordConfirm)) {
    throw new Error('Les mots de passe ne correspondent pas');
  }
};

export const submitRegisterFormUserInfos = async (
  userInfos: UserInfosRegister,
  setUserInfos: Dispatch<SetStateAction<UserInfosRegister>>,
) => {
  const response = await fetch(Endpoint.local.REGISTER, {
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

export const submitRegisterForm = async (
  event: FormEvent,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setModalContent: Dispatch<SetStateAction<IModal>>,
  setUserInfos: Dispatch<SetStateAction<UserInfosRegister>>,
  userInfos: UserInfosRegister,
  setIsButtonDisabled: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    event.preventDefault();
    setIsButtonDisabled(true);
    checkUserInfos(userInfos);
    const { code, message } = await submitRegisterFormUserInfos(
      userInfos,
      setUserInfos,
    );
    ApiResponseHandler(code, message, setIsModalOpen, setModalContent);
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
