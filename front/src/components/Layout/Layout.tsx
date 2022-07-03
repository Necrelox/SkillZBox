import { FC, ReactNode } from 'react';

// components
import Menu from 'components/Menu/Menu';

// styles
import styles from './Layout.module.scss';

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Menu />
      {children}
    </div>
  );
};

export default Layout;
