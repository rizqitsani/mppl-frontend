import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, QueryOptions } from 'react-query';

import 'react-image-lightbox/style.css';
import '@/styles/globals.css';
import PrivateRoute from '@/components/PrivateRoute';
import axiosClient from '@/lib/axios';

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await axiosClient.get(`${queryKey?.[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const protectedRoutes = ['/cart', '/checkout', '/orders'];

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
