import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import Router from 'next/router';

// components
import Layout from 'components/Layout/Layout';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';

// enums
import { InputType, InputValue } from 'enums/input.enum';
import { ButtonSize, ButtonStyle } from 'enums/button.enum';
import { ApiHeader, ApiMethod, ApiResponseCode } from 'enums/protocol.enum';
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
  const [modalContent, setModalContent] = useState<IModal>({
    message: '',
    type: ModalTypes.UNKNOWN,
  });

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
    setModalContent({ message: '', type: ModalTypes.UNKNOWN });
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
    }, 5000);
  };

  const fillAndOpenModalContent = (modalContent: IModal) => {
    resetModalContent();
    setModalContent(modalContent);
    showModal();
  };

  const isUserInfosValid = () => {
    const { username, email, password, passwordConfirm } = userInfos;
    return !username || !email || !password || !passwordConfirm;
  };

  const hasForbidenCharacters = (value: string) => {
    const forbidenCharacter = '@';
    return value.includes(forbidenCharacter);
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
    if (isUserInfosValid()) {
      throw new Error('Veuillez remplir tous les champs');
    }

    if (hasForbidenCharacters(userInfos.username)) {
      throw new Error(
        "Le nom d'utilisateur ne peut pas contenir le caractère @",
      );
    }

    if (!checkPasswordLength()) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }

    if (!comparePassword()) {
      throw new Error('Les mots de passe ne correspondent pas');
    }
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

    if (!content.code || !content.message) {
      throw new Error("Une erreur s'est produite lors de l'inscription");
    }

    return content;
  };

  const ApiResponseHandler = (code: string, message: string) => {
    fillAndOpenModalContent({
      message,
      type: code === ApiResponseCode.OK ? ModalTypes.SUCCESS : ModalTypes.ERROR,
    });
  };

  const onFormSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      checkUserInfos();
      const { code, message } = await submitUserInfos();
      ApiResponseHandler(code, message);
    } catch (error: any) {
      fillAndOpenModalContent({
        message: error.message,
        type: ModalTypes.ERROR,
      });
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
