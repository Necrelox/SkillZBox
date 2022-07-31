import { FC } from 'react';

// components
import ProfilePicture from './ProfilePicture/ProfilePicture';

// enums
import { ProfilePictureSize } from './ProfilePicture/profilePicture.enum';
import { UserStatus } from './user.enum';
import { StatusSize } from './Status/status.enum';

// styles
import styles from './User.module.scss';

export interface Props {
  username: string;
  message: string;
  status: UserStatus;
}

const User: FC<Props> = ({ username, message, status }) => {
  return (
    <div className={styles.userWrapper}>
      <ProfilePicture
        size={ProfilePictureSize.LARGE}
        status={status}
        statusSize={StatusSize.LARGE}
      />

      <div className={styles.userInfos}>
        <p className={styles.username}>{username}</p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default User;
