import { AppProps } from 'next/app';

import { ManagedContext } from '~/stores/Context';
import { GlobalStyle } from '~/components/GlobalStyle';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ManagedContext>
      <Component {...pageProps} />
      <GlobalStyle />
    </ManagedContext>
  );
};

export default App;
