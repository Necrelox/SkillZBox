import { FC } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';

// icons
import { IoHome, IoChatboxEllipses } from 'react-icons/io5';
import { FaUserAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

// redux
import { AppState } from 'redux/store';

// images
import LogoImage from '/public/images/skillzbox-logo.png';

// helpers
import { Endpoint } from 'helpers/endpoints';

// styles
import styles from './Menu.module.scss';

const Menu: FC = () => {
  const { user } = useSelector((state: AppState) => state);
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <div
      className={classNames(styles.container, {
        [styles.hiddenMenu]: !user.token,
      })}
    >
      <div className={classNames(styles.menuItem, styles.hidden)}>
        <a href={Endpoint.routes.HOME}>
          <Image src={LogoImage} height={50} width={40} />
        </a>
      </div>

      <div className={styles.menuItem}>
        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.HOME,
          })}
        >
          <p className={styles.text}>Accueil</p>
          <a href={Endpoint.routes.HOME}>
            <IoHome />
          </a>
        </div>

        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.ROOM,
          })}
        >
          <p className={styles.text}>Messages</p>
          <a href="#">
            <IoChatboxEllipses />
          </a>
        </div>

        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.PROFILE,
          })}
        >
          <p className={styles.text}>Profil</p>
          <a href={Endpoint.routes.PROFILE}>
            <FaUserAlt />
          </a>
        </div>

        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.LOGOUT,
          })}
        >
          <p className={styles.text}>Déconnexion</p>
          <a href={Endpoint.routes.LOGOUT}>
            <FiLogOut />
          </a>
        </div>
      </div>

      <div className={classNames(styles.menuItem, styles.hidden)}>
        <div className={styles.circle} />
      </div>
    </div>
  );
};

export default Menu;
