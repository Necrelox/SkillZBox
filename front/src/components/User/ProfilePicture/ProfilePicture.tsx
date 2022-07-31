import { FC } from 'react';
import classNames from 'classnames';

// components
import Status from '../Status/Status';

// enums
import { ProfilePictureSize } from './profilePicture.enum';
import { UserStatus } from '../user.enum';
import { StatusSize } from '../Status/status.enum';

// styles
import styles from './ProfilePicture.module.scss';

interface Props {
  status?: UserStatus;
  statusSize?: StatusSize;
  size: ProfilePictureSize;
}

const ProfilePicture: FC<Props> = ({ status, size, statusSize }) => {
  return (
    <div className={styles.profilePicture}>
      <div className={classNames(styles.mask, styles[size])}>
        <div className={styles.image} />
      </div>

      {status && statusSize && (
        <div
          className={classNames(styles.status, {
            [styles.statusSizeLarge]: statusSize === StatusSize.LARGE,
          })}
        >
          <Status status={status} size={statusSize} />
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
