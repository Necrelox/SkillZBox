import { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';

// interface
import { IModal } from './Modal.interface';

// enums
import { ModalTypes } from './modal.enum';

// styles
import styles from './Modal.module.scss';

interface Props {
  modalContent: IModal;
}

const openModal = (setModalContent: Dispatch<SetStateAction<IModal>>) => {
  setModalContent((prevValue) => ({
    ...prevValue,
    isOpen: true,
  }));
};

const closeModal = (setModalContent: Dispatch<SetStateAction<IModal>>) => {
  setModalContent((prevValue) => ({
    ...prevValue,
    isOpen: false,
  }));
};

const showModal = (setModalContent: Dispatch<SetStateAction<IModal>>) => {
  openModal(setModalContent);
  setTimeout(() => {
    closeModal(setModalContent);
  }, 3000);
};

const resetModalContent = (
  setModalContent: Dispatch<SetStateAction<IModal>>,
) => {
  setModalContent({ isOpen: false, message: '', type: ModalTypes.UNKNOWN });
  closeModal(setModalContent);
};

export const fillAndOpenModalContent = (
  modalContent: IModal,
  setModalContent: Dispatch<SetStateAction<IModal>>,
) => {
  resetModalContent(setModalContent);
  setModalContent(modalContent);
  showModal(setModalContent);
};

const Modal: FC<Props> = ({ modalContent }) => {
  return (
    <div
      className={classNames(styles.container, styles[modalContent.type], {
        [styles.isOpen]: modalContent.isOpen,
      })}
    >
      <p className={styles.modalText}>{modalContent.message}</p>
    </div>
  );
};

export default Modal;
