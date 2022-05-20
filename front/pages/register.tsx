import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';

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

// styles
import styles from 'styles/pages/Register.module.scss';
import {
  onLoginButtonClick,
  submitRegisterForm,
  userInfosHandler,
} from 'functions/register/register';

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

  const onUserInfosChange = (event: FormEvent<HTMLInputElement>) => {
    userInfosHandler(event, setUserInfos);
  };

  const onFormSubmit = async (event: FormEvent) => {
    submitRegisterForm(
      event,
      setIsModalOpen,
      setModalContent,
      setUserInfos,
      userInfos,
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
            Créer un compte<span className={styles.coloredDot}>.</span>
          </h1>
        </div>

        <form className={styles.formContainer} onSubmit={onFormSubmit}>
          <div className={styles.inputContainer}>
            <Input
              value={userInfos.username}
              type={InputType.TEXT}
              label="Pseudo"
              onChange={onUserInfosChange}
              inputName={InputName.USERNAME}
              hasIcon
              isRequired
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              value={userInfos.email}
              type={InputType.EMAIL}
              label="Email"
              onChange={onUserInfosChange}
              inputName={InputName.EMAIL}
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
                onChange={onUserInfosChange}
                inputName={InputName.PASSWORD}
                hasIcon
                isRequired
              />
            </div>

            <div className={styles.inputContainer}>
              <Input
                value={userInfos.passwordConfirm}
                type={InputType.PASSWORD}
                label="Confirmer le mot de passe"
                onChange={onUserInfosChange}
                inputName={InputName.PASSWORD_CONFIRM}
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
        <Modal isOpen={isModalOpen} modalContent={modalContent} />
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
