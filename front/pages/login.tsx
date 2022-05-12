import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

// components
import Layout from 'components/Layout/Layout';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal, { fillModal } from 'components/Modal/Modal';

// enums
import { InputType, InputValue } from 'enums/input.enum';
import { ButtonSize, ButtonStyle } from 'enums/button.enum';
import { ModalTypes } from 'enums/modal.enum';
import { ApiHeader, ApiMethod } from 'enums/protocol.enum';

// interfaces
import { IModal } from 'interfaces/Modal.interface';

// helpers
import { storeCommonServerSideData } from 'helpers/store';
import { Endpoint } from 'helpers/endpoints';

// redux
import { wrapper } from 'redux/store';
import { setUserTokenAction } from 'redux/user/user.actions';

// styles
import styles from 'styles/pages/Login.module.scss';

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IModal[]>([]);

  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  });

  const onUserInfosChange = (
    event: FormEvent<HTMLInputElement>,
    inputValue: InputValue,
  ) => {
    const { value } = event.currentTarget;
    setUserInfos((prevState) => ({
      ...prevState,
      [inputValue]: value,
    }));
  };

  const resetUserInfos = () => {
    setUserInfos({
      email: '',
      password: '',
    });
  };

  const onRegisterButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    Router.push('/register');
  };

  const resetModalContent = () => {
    setModalContent([]);
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    openModal();
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  const fillAndOpenModalContent = (content: IModal[]) => {
    resetModalContent();
    fillModal(setModalContent, content);
    showModal();
  };

  const fillAndOpenModalContentWithErrors = (errors: string[]) => {
    resetModalContent();

    errors.forEach((error) => {
      setModalContent((oldValues) => [
        ...oldValues,
        { type: ModalTypes.ERROR, message: error },
      ]);
    });

    showModal();
  };

  const isUserInfosValid = () => {
    const { email, password } = userInfos;
    return !email || !password;
  };

  const checkPasswordLength = () => {
    const { password } = userInfos;
    return password.length >= 8;
  };

  const checkUserInfos = () => {
    const errors: string[] = [];

    if (isUserInfosValid()) {
      errors.push('Remplissez tous les champs');
    }

    if (!checkPasswordLength()) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }

    return errors;
  };

  const submitUserInfos = async () => {
    const response = await fetch(Endpoint.local.LOGIN, {
      method: ApiMethod.POST,
      headers: {
        [ApiHeader.CONTENT_TYPE]: ApiHeader.APPLICATION_JSON,
      },
      body: JSON.stringify(userInfos),
    });

    const { content } = await response.json();
    resetUserInfos();

    return content;
  };

  const ApiResponseHandler = (code: string, token: string, error: string) => {
    switch (code) {
      case 'OK':
        dispatch(setUserTokenAction(token));
        fillAndOpenModalContent([
          {
            type: ModalTypes.SUCCESS,
            message: 'Vous êtes connecté. Token : ' + token,
          },
        ]);
        break;

      default:
        fillAndOpenModalContent([
          {
            type: ModalTypes.ERROR,
            message: error,
          },
        ]);
        break;
    }
  };

  const onFormSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      const errors = checkUserInfos();
      if (errors.length > 0) {
        fillAndOpenModalContentWithErrors(errors);
        return;
      }

      const { code, token, error } = await submitUserInfos();
      ApiResponseHandler(code, token, error?.message);
    } catch (error: any) {
      fillAndOpenModalContent([
        {
          type: ModalTypes.ERROR,
          message: error,
        },
      ]);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p className={styles.subtitle}>
            Chattez à travers le monde gratuitement.
          </p>

          <h1 className={styles.title}>
            Se connecter<span className={styles.coloredDot}>.</span>
          </h1>
        </div>

        <form className={styles.formContainer} onSubmit={onFormSubmit}>
          <div className={styles.inputContainer}>
            <Input
              value={userInfos.email}
              type={InputType.EMAIL}
              label="Email"
              onChange={(event: FormEvent<HTMLInputElement>) =>
                onUserInfosChange(event, InputValue.EMAIL)
              }
              hasIcon
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              value={userInfos.password}
              type={InputType.PASSWORD}
              label="Mot de passe"
              onChange={(event: FormEvent<HTMLInputElement>) =>
                onUserInfosChange(event, InputValue.PASSWORD)
              }
              hasIcon
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button
              text="Créer un compte"
              size={ButtonSize.MEDIUM}
              style={ButtonStyle.TEXT}
              onClick={onRegisterButtonClick}
            />

            <Button
              text="Se connecter"
              size={ButtonSize.MEDIUM}
              style={ButtonStyle.FILLED}
              isSubmitButton
            />
          </div>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        modalContent={modalContent}
        onClose={closeModal}
      />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await storeCommonServerSideData({ store, ...ctx });

    return {
      props: {},
    };
  },
);

export default Login;
