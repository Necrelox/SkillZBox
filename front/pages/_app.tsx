import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useSelector } from 'react-redux';

// redux
import { AppState, wrapper } from 'redux/store';

// styles
import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { common } = useSelector((state: AppState) => state);

  useEffect(() => {
    common.errors.forEach((error) => {
      console.error(
        `%c${error.actionName}`,
        'font-size:30px;',
        JSON.parse(error.error),
      );
    });
  }, [common.errors]);

  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
