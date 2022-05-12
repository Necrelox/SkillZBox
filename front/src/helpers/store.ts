import { GetServerSidePropsContext } from 'next';
import { AnyAction, Store } from 'redux';

// common
import { HttpMethod } from 'enums/protocol.enum';

// redux
import { setBaseUrlAction } from 'redux/common/common.actions';

export const storeCommonServerSideData = async (
  context: { store: Store } & GetServerSidePropsContext,
): Promise<void> => {
  const { store, req } = context;
  const { dispatch } = store;

  const protocol = HttpMethod.HTTPS;

  dispatch<AnyAction>(setBaseUrlAction(`${protocol}://${req.headers.host}`));
};
