import { FC, ReactNode } from 'react';

// styles
import styles from './Layout.module.scss';

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
