import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
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
        <Link href={Endpoint.routes.HOME}>
          <a>
            <Image src={LogoImage} height={50} width={40} />
          </a>
        </Link>
      </div>

      <div className={styles.menuItem}>
        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.HOME,
          })}
        >
          <p className={styles.text}>Accueil</p>
          <Link href={Endpoint.routes.HOME}>
            <a>
              <IoHome />
            </a>
          </Link>
        </div>

        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.ROOM,
          })}
        >
          <p className={styles.text}>Messages</p>
          <Link href="#">
            <a>
              <IoChatboxEllipses />
            </a>
          </Link>
        </div>

        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.PROFILE,
          })}
        >
          <p className={styles.text}>Profil</p>
          <Link href={Endpoint.routes.PROFILE}>
            <a>
              <FaUserAlt />
            </a>
          </Link>
        </div>

        <div
          className={classNames(styles.icon, {
            [styles.active]: currentPage === Endpoint.routes.LOGOUT,
          })}
        >
          <p className={styles.text}>Déconnexion</p>
          <Link href={Endpoint.routes.LOGOUT}>
            <a>
              <FiLogOut />
            </a>
          </Link>
        </div>
      </div>

      <div className={classNames(styles.menuItem, styles.hidden)}>
        <div className={styles.circle} />
      </div>
    </div>
  );
};

export default Menu;
