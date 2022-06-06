import type { NextPage } from 'next';

// components
import Layout from 'components/Layout/Layout';

// helpers
import { storeCommonServerSideData } from 'helpers/store';

// redux
import { wrapper } from 'redux/store';

// styles
import styles from 'styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}></div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await storeCommonServerSideData({ store, ...ctx });

    return {
      props: {},
    };
  },
);

export default Home;
