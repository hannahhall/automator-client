import { AppProps } from 'next/app';
import React from 'react';

import { AuthProvider } from '../hooks/useAuth';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
