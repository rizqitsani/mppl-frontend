import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';
import PrivateRoute from '@/components/PrivateRoute';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const protectedRoutes = ['/cart', '/checkout', '/orders', '/orders/[id]'];

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default MyApp;
