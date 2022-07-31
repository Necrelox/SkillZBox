import { Dispatch, FormEvent, SetStateAction } from 'react';

// components
import { fillAndOpenModalContent } from 'components/Modal/Modal';
import { ModalTypes } from 'components/Modal/modal.enum';
import { IModal } from 'components/Modal/Modal.interface';

// enums
import { ApiHeader, ApiMethod } from 'enums/protocol.enum';

// helpers
import { Endpoint } from 'helpers/endpoints';

// functions
import {
  ApiResponseHandler,
  checkUserInfos,
  resetUserInfos,
} from 'functions/register/register';

// interfaces
import { UserInfosRegister } from 'interfaces/UserInfos.interface';

export const sendUpdateProfilFormToAPI = async (
  userInfos: UserInfosRegister,
  setUserInfos: Dispatch<SetStateAction<UserInfosRegister>>,
  userToken: string,
) => {
  const response = await fetch(Endpoint.local.USER.ME, {
    method: ApiMethod.PUT,
    headers: {
      [ApiHeader.AUTHORIZATION]: userToken,
    },
    body: JSON.stringify(userInfos),
  });
  const { code, message } = await response.json();

  resetUserInfos(setUserInfos);

  if (!code || !message) {
    throw new Error("Une erreur s'est produite. Veuillez réessayer");
  }

  return { code, message };
};

export const submitUpdateProfileForm = async (
  event: FormEvent,
  setModalContent: Dispatch<SetStateAction<IModal>>,
  setUserInfos: Dispatch<SetStateAction<UserInfosRegister>>,
  userInfos: UserInfosRegister,
  setIsButtonDisabled: Dispatch<SetStateAction<boolean>>,
  userToken: string,
) => {
  try {
    event.preventDefault();
    setIsButtonDisabled(true);
    checkUserInfos(userInfos);
    const { code, message } = await sendUpdateProfilFormToAPI(
      userInfos,
      setUserInfos,
      userToken,
    );
    ApiResponseHandler(code, message, setModalContent);
    setIsButtonDisabled(false);
  } catch (error: any) {
    setIsButtonDisabled(false);
    fillAndOpenModalContent(
      {
        isOpen: true,
        message: error.message,
        type: ModalTypes.ERROR,
      },
      setModalContent,
    );
  }
};
