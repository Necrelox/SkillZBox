import { FC, FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

// react-icons
import { FaAddressCard } from 'react-icons/fa';
import { HiMail, HiEye, HiEyeOff } from 'react-icons/hi';

// enums
import { InputName, InputType } from './input.enum';

// styles
import styles from './Input.module.scss';

interface Props {
  value: string | number | readonly string[] | undefined;
  type: InputType;
  label?: string;
  placeholder?: string;
  hasIcon?: boolean;
  isRequired?: boolean;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  inputName: InputName;
}

const Input: FC<Props> = ({
  value,
  type,
  label,
  placeholder,
  hasIcon,
  onChange,
  isRequired,
  inputName,
}) => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [inputType, setInputType] = useState<InputType>(type);

  useEffect(() => {
    if (type === InputType.PASSWORD) {
      isIconVisible
        ? setInputType(InputType.TEXT)
        : setInputType(InputType.PASSWORD);
    }
  }, [isIconVisible]);

  const selectCurrentIconComponent = () => {
    switch (type) {
      case InputType.TEXT:
        return <FaAddressCard />;

      case InputType.EMAIL:
        return <HiMail />;

      case InputType.PASSWORD:
        return isIconVisible ? (
          <HiEyeOff onClick={toggleIconVisibility} />
        ) : (
          <HiEye onClick={toggleIconVisibility} />
        );

      default:
        break;
    }
  };

  const toggleIconVisibility = () => {
    setIsIconVisible((oldValue) => !oldValue);
  };

  const currentIconComponent = selectCurrentIconComponent();

  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        type={inputType || type}
        className={classNames(styles.input, styles[type])}
        autoComplete="off"
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
        name={inputName}
      />

      <label className={styles.label}>{label}</label>

      {hasIcon && <div className={styles.icon}>{currentIconComponent}</div>}
    </div>
  );
};

export default Input;
