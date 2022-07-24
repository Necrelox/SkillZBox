import { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Layout from 'components/Layout/Layout';

// helpers
import { storeCommonServerSideData } from 'helpers/store';
import { getUserData } from 'helpers/utils';

// redux
import { AppState, wrapper } from 'redux/store';
import { setUserDataAction } from 'redux/user/user.actions';

// components
import { ButtonSize, ButtonStyle } from 'components/Button/button.enum';
import { InputName, InputType } from 'components/Input/input.enum';
import { IModal } from 'components/Modal/Modal.interface';
import { ModalTypes } from 'components/Modal/modal.enum';
import { UserStatus } from 'components/User/user.enum';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import User from 'components/User/User';

// functions
import { userInfosHandler } from 'functions/register/register';
import { submitUpdateProfileForm } from 'functions/profile/profile';

// interfaces
import { UserInfosRegister } from 'interfaces/UserInfos.interface';

// styles
import styles from 'styles/pages/Profile.module.scss';

const UserProfile: NextPage = () => {
  const dispatch = useDispatch();
  const { common, user } = useSelector((state: AppState) => state);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IModal>({
    message: '',
    type: ModalTypes.UNKNOWN,
  });
  const [userInfos, setUserInfos] = useState<UserInfosRegister>({
    username: user.username,
    email: user.email,
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    const fetchUserInfos = async () => {
      const userInfoFromDatabase = await getUserData(common, dispatch);
      if (userInfoFromDatabase) {
        dispatch(setUserDataAction(userInfoFromDatabase));
      }
    };

    fetchUserInfos();
  }, []);

  const onUserInfosChange = (event: FormEvent<HTMLInputElement>) => {
    userInfosHandler(event, setUserInfos);
  };

  const submitEditProfileForm = async (event: FormEvent) => {
    submitUpdateProfileForm(
      event,
      setIsModalOpen,
      setModalContent,
      setUserInfos,
      userInfos,
      setIsButtonDisabled,
      user.token,
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Profil</h1>

        <div className={styles.marginContainer}>
          <User
            message={user.activityMessage}
            status={UserStatus.ONLINE}
            username={user.username}
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
              isDisabled={isButtonDisabled}
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
