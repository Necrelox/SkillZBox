import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

// components
import Layout from 'components/Layout/Layout';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';

// enums
import { InputType, InputValue } from 'enums/input.enum';
import { ButtonSize, ButtonStyle } from 'enums/button.enum';
import { ModalTypes } from 'enums/modal.enum';
import { ApiHeader, ApiMethod, ApiResponseCode } from 'enums/protocol.enum';

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
  const [modalContent, setModalContent] = useState<IModal>({
    message: '',
    type: ModalTypes.UNKNOWN,
  });

  const [userInfos, setUserInfos] = useState({
    username: '',
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
      username: '',
      password: '',
    });
  };

  const onRegisterButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    Router.push('/register');
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
    const { username, password } = userInfos;
    return !username || !password;
  };

  const checkPasswordLength = () => {
    const { password } = userInfos;
    return password.length >= 8;
  };

  const checkUserInfos = () => {
    if (isUserInfosValid()) {
      throw new Error('Veuillez remplir tous les champs');
    }

    if (!checkPasswordLength()) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }
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

    if (!content.code || (!content.message && !content.token)) {
      throw new Error("Une erreur s'est produite lors de l'authentification");
    }

    return content;
  };

  const ApiResponseHandler = (code: string, token: string, message: string) => {
    fillAndOpenModalContent({
      message: code === ApiResponseCode.OK ? token : message,
      type: code === ApiResponseCode.OK ? ModalTypes.SUCCESS : ModalTypes.ERROR,
    });
    if (token) {
      dispatch(setUserTokenAction(token));
    }
  };

  const onFormSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      checkUserInfos();
      const { code, token, message } = await submitUserInfos();
      ApiResponseHandler(code, token, message);
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
            Se connecter<span className={styles.coloredDot}>.</span>
          </h1>
        </div>

        <form className={styles.formContainer} onSubmit={onFormSubmit}>
          <div className={styles.inputContainer}>
            <Input
              value={userInfos.username}
              type={InputType.TEXT}
              label="Email ou pseudo"
              onChange={(event: FormEvent<HTMLInputElement>) =>
                onUserInfosChange(event, InputValue.USERNAME)
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
