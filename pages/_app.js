import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';

import '@/styles/globals.css';
import PrivateRoute from '@/components/PrivateRoute';

function MyApp({ Component, pageProps }) {
  const protectedRoutes = ['/cart', '/checkout', '/orders', '/orders/[id]'];

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default MyApp;
