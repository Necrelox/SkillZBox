import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';

// components
import Layout from 'components/Layout/Layout';

// helpers
import { storeCommonServerSideData } from 'helpers/store';

// redux
import { wrapper } from 'redux/store';

// components
import { ButtonSize, ButtonStyle } from 'components/Button/button.enum';
import Modal, { fillAndOpenModalContent } from 'components/Modal/Modal';
import { InputName, InputType } from 'components/Input/input.enum';
import { IModal } from 'components/Modal/Modal.interface';
import { ModalTypes } from 'components/Modal/modal.enum';
import { UserStatus } from 'components/User/user.enum';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import User from 'components/User/User';

// functions
import { checkUserInfos, userInfosHandler } from 'functions/register/register';

// interfaces
import { UserInfosRegister } from 'interfaces/UserInfos.interface';

// styles
import styles from 'styles/pages/Profile.module.scss';

const UserProfile: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IModal>({
    message: '',
    type: ModalTypes.UNKNOWN,
  });
  const [userInfos, setUserInfos] = useState<UserInfosRegister>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const onUserInfosChange = (event: FormEvent<HTMLInputElement>) => {
    userInfosHandler(event, setUserInfos);
  };

  const submitEditProfileForm = async (event: FormEvent) => {
    try {
      event.preventDefault();
      checkUserInfos(userInfos);
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

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Profil</h1>

        <div className={styles.marginContainer}>
          <User
            message="Je suis le message"
            status={UserStatus.ONLINE}
            username={userInfos.username || 'Bernardo Croquette'}
          />
        </div>

        <form className={styles.formContainer} onSubmit={submitEditProfileForm}>
          <div className={styles.marginContainer}>
            <Input
              inputName={InputName.USERNAME}
              onChange={onUserInfosChange}
              type={InputType.TEXT}
              value={userInfos.username}
              label="Modifiez votre pseudo"
              hasIcon
            />
          </div>

          <div className={styles.marginContainer}>
            <Input
              inputName={InputName.EMAIL}
              onChange={onUserInfosChange}
              type={InputType.EMAIL}
              value={userInfos.email}
              label="Modifiez votre adresse mail"
              hasIcon
            />
          </div>

          <div className={styles.marginContainer}>
            <Input
              inputName={InputName.PASSWORD}
              onChange={onUserInfosChange}
              type={InputType.PASSWORD}
              value={userInfos.password}
              label="Modifiez votre mot de passe"
              hasIcon
            />
          </div>

          <div className={styles.marginContainer}>
            <Input
              inputName={InputName.PASSWORD_CONFIRM}
              onChange={onUserInfosChange}
              type={InputType.PASSWORD}
              value={userInfos.passwordConfirm}
              label="Confirmez votre mot de passe"
              hasIcon
            />
          </div>

          <div className={styles.center}>
            <Button
              text="Modifier"
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

export default UserProfile;
