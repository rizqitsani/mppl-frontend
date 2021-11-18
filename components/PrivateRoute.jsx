import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { ImSpinner8 } from 'react-icons/im';

import { useAuthState } from '@/contexts/AuthContext';

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthState();

  const isProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
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
