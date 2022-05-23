import type { NextPage } from 'next';

// helpers
import { storeCommonServerSideData } from 'helpers/store';

// redux
import { wrapper } from 'redux/store';

const Home: NextPage = () => {
  return <></>;
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
