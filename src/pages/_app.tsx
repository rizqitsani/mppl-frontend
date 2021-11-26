import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import PrivateRoute from '@/components/PrivateRoute';

function MyApp({ Component, pageProps }: AppProps) {
  const protectedRoutes = ['/cart', '/checkout', '/orders', '/orders/[id]'];

  return (
    <>
      <div>
        <Toaster
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
      <PrivateRoute protectedRoutes={protectedRoutes}>
        <Component {...pageProps} />
      </PrivateRoute>
    </>
  );
}

export default MyApp;
