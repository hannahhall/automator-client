import { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import '../styles/index.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
