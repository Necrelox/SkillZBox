import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useSelector, useDispatch } from 'react-redux';

// components
import Modal from 'components/Modal/Modal';
import { ModalTypes } from 'components/Modal/modal.enum';
import { IModal } from 'components/Modal/Modal.interface';

// redux
import { AppState, wrapper } from 'redux/store';

// helpers
import { autoLogin } from 'helpers/utils';

// styles
import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();
  const { common } = useSelector((state: AppState) => state);

  const [modalContent, setModalContent] = useState<IModal>({
    isOpen: false,
    message: '',
    type: ModalTypes.UNKNOWN,
  });

  useEffect(() => {
    autoLogin(common, dispatch, setModalContent);
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
      <Modal modalContent={modalContent} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
