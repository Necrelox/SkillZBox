import { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';

// interfaces
import { IModal } from 'interfaces/Modal.interface';

// enums
import { ModalTypes } from 'enums/modal.enum';

// styles
import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  modalContent: IModal;
}

const openModal = (setIsModalOpen: Dispatch<SetStateAction<boolean>>) => {
  setIsModalOpen(true);
};

const closeModal = (setIsModalOpen: Dispatch<SetStateAction<boolean>>) => {
  setIsModalOpen(false);
};

const showModal = (setIsModalOpen: Dispatch<SetStateAction<boolean>>) => {
  openModal(setIsModalOpen);
  setTimeout(() => {
    closeModal(setIsModalOpen);
  }, 3000);
};

const resetModalContent = (
  setModalContent: Dispatch<SetStateAction<IModal>>,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
) => {
  setModalContent({ message: '', type: ModalTypes.UNKNOWN });
  closeModal(setIsModalOpen);
};

export const fillAndOpenModalContent = (
  modalContent: IModal,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setModalContent: Dispatch<SetStateAction<IModal>>,
) => {
  resetModalContent(setModalContent, setIsModalOpen);
  setModalContent(modalContent);
  showModal(setIsModalOpen);
};

const Modal: FC<Props> = ({ isOpen, modalContent }) => {
  return (
    <div
      className={classNames(styles.container, styles[modalContent.type], {
        [styles.isOpen]: isOpen,
      })}
    >
      <p className={styles.modalText}>{modalContent.message}</p>
    </div>
  );
};

export default Modal;
