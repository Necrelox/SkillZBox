import { FC } from 'react';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

// interfaces
import { IModal } from 'interfaces/Modal.interface';

// styles
import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  modalContent: IModal;
}

const Modal: FC<Props> = ({ isOpen, onClose, modalContent }) => {
  return (
    <div
      className={classNames(styles.container, styles[modalContent.type], {
        [styles.isOpen]: isOpen,
      })}
    >
      <div className={styles.closeIcon} onClick={onClose}>
        <AiOutlineClose />
      </div>

      <p className={styles.modalText}>{modalContent.message}</p>
    </div>
  );
};

export default Modal;
