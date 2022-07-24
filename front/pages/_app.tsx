import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useSelector, useDispatch } from 'react-redux';

// components
import Modal, { fillAndOpenModalContent } from 'components/Modal/Modal';
import { ModalTypes } from 'components/Modal/modal.enum';
import { IModal } from 'components/Modal/Modal.interface';

// redux
import { AppState, wrapper } from 'redux/store';
import { setUserDataAction } from 'redux/user/user.actions';

// helpers
import { getUserData } from 'helpers/utils';

// styles
import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const { common } = useSelector((state: AppState) => state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<IModal>({
    message: '',
    type: ModalTypes.UNKNOWN,
  });

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const userInfoFromDatabase = await getUserData(common, dispatch);
        if (userInfoFromDatabase) {
          dispatch(setUserDataAction(userInfoFromDatabase));
        }
      } catch (error: any) {
        console.warn(error);
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

    fetchUserInfos();
  }, []);

  useEffect(() => {
    common.errors.forEach((error) => {
      console.error(
        `%c${error.actionName}`,
        'font-size:30px;',
        JSON.parse(error.error),
      );
    });
  }, [common.errors]);

  return (
    <>
      <Component {...pageProps} />;
      <Modal isOpen={isModalOpen} modalContent={modalContent} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
