import { FC } from 'react';
import classNames from 'classnames';

// enums
import { UserStatus } from '../user.enum';
import { StatusSize } from './status.enum';

// styles
import styles from './Status.module.scss';

interface Props {
  status: UserStatus;
  size: StatusSize;
}

const Status: FC<Props> = ({ status, size }) => {
  return (
    <div className={classNames(styles.status, styles[status], styles[size])} />
  );
};

export default Status;
