import { FC } from 'react';
import classNames from 'classnames';

// styles
import styles from './Button.module.scss';

interface Props {
  style: string;
  size: string;
  text: string;
  isSubmitButton?: boolean;
  onClick?: (event: any) => void;
}

enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

const Button: FC<Props> = ({
  style,
  size,
  text,
  onClick,
  isSubmitButton = false,
}) => {
  return (
    <button
      type={isSubmitButton ? ButtonType.SUBMIT : ButtonType.BUTTON}
      onClick={onClick}
      className={classNames(styles.button, styles[style], styles[size])}
    >
      {text}
    </button>
  );
};

export default Button;
