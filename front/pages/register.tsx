import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import Router from 'next/router';

// components
import Layout from 'components/Layout/Layout';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal, { fillModal } from 'components/Modal/Modal';

// enums
import { InputType, InputValue } from 'enums/input.enum';
import { ButtonSize, ButtonStyle } from 'enums/button.enum';
import { ApiHeader, ApiMethod } from 'enums/protocol.enum';
import { ModalTypes } from 'enums/modal.enum';

// interfaces
import { IModal } from 'interfaces/Modal.interface';

// helpers
import { storeCommonServerSideData } from 'helpers/store';
import { Endpoint } from 'helpers/endpoints';

// redux
import { wrapper } from 'redux/store';

// styles
import styles from 'styles/pages/Register.module.scss';

const Register: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IModal[]>([]);

  const [userInfos, setUserInfos] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
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
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  };

  const onLoginButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    Router.push('/login');
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

    setIsModalOpen(true);
  };

  const isUserInfosValid = () => {
    const { username, email, password, passwordConfirm } = userInfos;
    return !username || !email || !password || !passwordConfirm;
  };

  const comparePassword = () => {
    const { password, passwordConfirm } = userInfos;
    return password === passwordConfirm;
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

    if (!comparePassword()) {
      errors.push('Les mots de passe ne correspondent pas');
    }

    return errors;
  };

  const submitUserInfos = async () => {
    const response = await fetch(Endpoint.local.REGISTER, {
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

  const ApiResponseHandler = (code: string, message: string, error: string) => {
    switch (code) {
      case 'OK':
        fillAndOpenModalContent([
          {
            type: ModalTypes.SUCCESS,
            message,
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

      const { code, message, error } = await submitUserInfos();
      ApiResponseHandler(code, message, error?.message);
    } catch (error: any) {
      fillAndOpenModalContent([
        {
          type: ModalTypes.ERROR,
          message: error.message,
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
            Créer un compte<span className={styles.coloredDot}>.</span>
          </h1>
        </div>

        <form className={styles.formContainer} onSubmit={onFormSubmit}>
          <div className={styles.inputContainer}>
            <Input
              value={userInfos.username}
              type={InputType.TEXT}
              label="Pseudo"
              onChange={(event: FormEvent<HTMLInputElement>) =>
                onUserInfosChange(event, InputValue.USERNAME)
              }
              hasIcon
              isRequired
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              value={userInfos.email}
              type={InputType.EMAIL}
              label="Email"
              onChange={(event: FormEvent<HTMLInputElement>) =>
                onUserInfosChange(event, InputValue.EMAIL)
              }
              hasIcon
              isRequired
            />
          </div>

          <div className={styles.passwordContainer}>
            <div className={styles.inputContainer}>
              <Input
                value={userInfos.password}
                type={InputType.PASSWORD}
                label="Mot de passe"
                placeholder="8 caractères minimum"
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  onUserInfosChange(event, InputValue.PASSWORD)
                }
                hasIcon
                isRequired
              />
            </div>

            <div className={styles.inputContainer}>
              <Input
                value={userInfos.passwordConfirm}
                type={InputType.PASSWORD}
                label="Confirmer le mot de passe"
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  onUserInfosChange(event, InputValue.PASSWORD_CONFIRM)
                }
                hasIcon
                isRequired
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              text="Se connecter"
              size={ButtonSize.MEDIUM}
              style={ButtonStyle.TEXT}
              onClick={onLoginButtonClick}
            />

            <Button
              text="Créer un compte"
              size={ButtonSize.MEDIUM}
              style={ButtonStyle.FILLED}
              isSubmitButton
            />
          </div>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalContent={modalContent}
        />
      </div>
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

export default Register;
