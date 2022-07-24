import { ChangeEvent, FC, useState } from 'react';
import { BsImage } from 'react-icons/bs';

// components
import { InputType } from 'components/Input/input.enum';

// styles
import styles from './InputFile.module.scss';

interface Props {
  label?: string;
}

const InputFile: FC<Props> = ({ label }) => {
  const [fileName, setFileName] = useState('Pas de photo sélectionnée');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const filename = event.currentTarget.files[0].name;
      if (filename.length > 40) {
        setFileName(filename.substring(0, 40) + '...');
      } else {
        setFileName(filename);
      }
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={InputType.FILE}>
        {label}
      </label>

      <input
        className={styles.input}
        type={InputType.FILE}
        id={InputType.FILE}
        onChange={onChange}
      />

      <span className={styles.fileName}>{fileName}</span>

      <div className={styles.icon}>
        <BsImage />
      </div>
    </div>
  );
};

export default InputFile;
