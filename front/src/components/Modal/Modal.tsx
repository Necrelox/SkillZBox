import { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

// interfaces
import { IModal } from 'interfaces/Modal.interface';

// enums
import { ModalTypes } from 'enums/modal.enum';

// styles
import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  modalContent: IModal[];
}

export const fillModal = (
  setModalContent: Dispatch<SetStateAction<IModal[]>>,
  data: IModal[],
) => {
  data.map((message) => {
    setModalContent((prevState: IModal[]) => [...prevState, message]);
  });
};

const Modal: FC<Props> = ({ isOpen, onClose, modalContent }) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.isOpen]: isOpen,
      })}
    >
      <div className={styles.closeIcon} onClick={onClose}>
        <AiOutlineClose />
      </div>

      {modalContent.map((modal: IModal, index: number) => (
        <div key={index} className={styles.modalContent}>
          <div className={classNames(styles.typeIcon, [styles[modal.type]])}>
            {modal.type === ModalTypes.ERROR ? (
              <AiOutlineClose />
            ) : (
              <AiOutlineCheck />
            )}
          </div>
          <p className={styles.modalText}>{modal.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Modal;
