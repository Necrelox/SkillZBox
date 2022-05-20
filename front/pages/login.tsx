import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import Layout from 'components/Layout/Layout';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';

// enums
import { InputName, InputType } from 'enums/input.enum';
import { ButtonSize, ButtonStyle } from 'enums/button.enum';
import { ModalTypes } from 'enums/modal.enum';

// interfaces
import { IModal } from 'interfaces/Modal.interface';

// helpers
import { storeCommonServerSideData } from 'helpers/store';

// redux
import { wrapper } from 'redux/store';

// functions
import {
  onRegisterButtonClick,
  submitLoginForm,
  userInfosHandler,
} from 'functions/login/login';

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

  const onUserInfosChange = (event: FormEvent<HTMLInputElement>) => {
    userInfosHandler(event, setUserInfos);
  };

  const onFormSubmit = (event: FormEvent) => {
    submitLoginForm(
      event,
      setIsModalOpen,
      setModalContent,
      setUserInfos,
      userInfos,
      dispatch,
    );
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
              onChange={onUserInfosChange}
              inputName={InputName.USERNAME}
              hasIcon
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              value={userInfos.password}
              type={InputType.PASSWORD}
              label="Mot de passe"
              onChange={onUserInfosChange}
              inputName={InputName.PASSWORD}
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
      <Modal isOpen={isModalOpen} modalContent={modalContent} />
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
