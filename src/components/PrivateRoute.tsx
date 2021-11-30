import * as React from 'react';
import { useRouter } from 'next/router';

import { ImSpinner8 } from 'react-icons/im';

import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';

import axiosClient from '@/lib/axios';
import { CartApi, UserInfoApi } from '@/types/api';

type PrivateRouteProps = {
  protectedRoutes: string[];
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

  const populate = useCartStore.usePopulate();

  const isProtected = protectedRoutes.indexOf(router.pathname) !== -1;

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
    if (!isLoading && !isAuthenticated && isProtected) {
      router.push('/signin');
    }
  }, [isLoading, isAuthenticated, isProtected, router]);

  if ((isLoading || !isAuthenticated) && isProtected) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-gray-800'>
        <ImSpinner8 className='mb-4 text-4xl animate-spin' />
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}
