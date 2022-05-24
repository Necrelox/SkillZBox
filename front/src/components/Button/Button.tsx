import { FC } from 'react';
import classNames from 'classnames';

// enums
import { ButtonType } from './button.enum';

// styles
import styles from './Button.module.scss';

interface Props {
  style: string;
  size: string;
  text: string;
  isSubmitButton?: boolean;
  onClick?: (event: any) => void;
  isDisabled?: boolean;
}

const Button: FC<Props> = ({
  style,
  size,
  text,
  onClick,
  isSubmitButton = false,
  isDisabled = false,
}) => {
  return (
    <button
      type={isSubmitButton ? ButtonType.SUBMIT : ButtonType.BUTTON}
      disabled={isDisabled}
      onClick={onClick}
      className={classNames(styles.button, styles[style], styles[size])}
    >
      {isDisabled && <div className={styles.loader} />}
      {!isDisabled && text}
    </button>
  );
};

export default Button;
