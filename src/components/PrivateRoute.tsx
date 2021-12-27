import * as React from 'react';
import { useRouter } from 'next/router';

import { ImSpinner8 } from 'react-icons/im';

import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';

import axiosClient from '@/lib/axios';
import { CartApi, UserInfoApi } from '@/types/api';
import { ProtectedRoute } from '@/types/auth';

type PrivateRouteProps = {
  protectedRoutes: ProtectedRoute[];
  children: JSX.Element;
};

export default function PrivateRoute({
  protectedRoutes,
  children,
}: PrivateRouteProps) {
  const router = useRouter();

  const isAuthenticated = useAuthStore.useIsAuthenticated();
  const isLoading = useAuthStore.useIsLoading();
  const login = useAuthStore.useLogin();
  const stopLoading = useAuthStore.useStopLoading();
  const user = useAuthStore.useUser();

  const populate = useCartStore.usePopulate();

  const currentRoute: ProtectedRoute = React.useMemo(() => {
    return (
      protectedRoutes.find((route) => route.path === router.pathname) || {
        path: router.pathname,
        type: 'all',
      }
    );
  }, [protectedRoutes, router.pathname]);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token === null || token === undefined) {
          return;
        }

        const res = await axiosClient.get<UserInfoApi>('/auth/info');

        login({
          ...res.data.data,
          token: token + '',
        });

        const cart = await axiosClient.get<CartApi>('/cart');

        populate(cart.data.data.items, cart.data.data.total);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        stopLoading();
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Prevent user from accessing auth or other role pages when authenticated
        if (
          currentRoute.type === 'auth' ||
          (currentRoute.type !== user.role && currentRoute.type !== 'all')
        ) {
          if (user.role === 'admin') {
            router.replace('/admin/dashboard');
          } else if (user.role === 'user') {
            router.replace('/products');
          }
        }
        // Prevent user from accessing protected pages when authenticated
      } else {
        if (currentRoute.type !== 'auth' && currentRoute.type !== 'all') {
          router.replace('/products');
        }
      }
    }
  }, [currentRoute, isAuthenticated, isLoading, router, user]);

  if (
    ((isLoading || isAuthenticated) &&
      (currentRoute.type === 'auth' ||
        (currentRoute.type !== user?.role && currentRoute.type !== 'all'))) ||
    ((isLoading || !isAuthenticated) &&
      currentRoute?.type !== 'auth' &&
      currentRoute?.type !== 'all')
  ) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-gray-800'>
        <ImSpinner8 className='mb-4 text-4xl animate-spin' />
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}
