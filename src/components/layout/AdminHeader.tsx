import * as React from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';

import clsx from 'clsx';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';

import useAuthStore from '@/store/useAuthStore';

import NextImage from '@/components/NextImage';

import { getAvatarUrl } from '@/lib/helper';

type AdminHeaderProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminHeader({ setSidebarOpen }: AdminHeaderProps) {
  const router = useRouter();

  const logout = useAuthStore.useLogout();

  const handleLogout = () => {
    logout();
    router.replace('/signin');
  };

  return (
    <div className='relative z-10 flex justify-between flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:hidden'>
      <button
        className='px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-100 lg:hidden'
        onClick={() => setSidebarOpen(true)}
      >
        <span className='sr-only'>Open sidebar</span>
        <HiOutlineMenuAlt1 className='w-6 h-6' aria-hidden='true' />
      </button>
      <div className='flex items-center px-4 sm:px-6 lg:px-8'>
        {/* Profile dropdown */}
        <Menu as='div' className='relative ml-3'>
          {({ open }) => (
            <>
              <div>
                <Menu.Button className='flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-100'>
                  <span className='sr-only'>Open user menu</span>
                  <div className='w-10 h-10 overflow-hidden rounded-full'>
                    <NextImage
                      src={getAvatarUrl('Admin')}
                      alt='Logo'
                      height='64'
                      width='64'
                      className='w-full h-full'
                    />
                  </div>
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={React.Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  static
                  className='absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                >
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={clsx(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          View profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={clsx(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={clsx(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block w-full text-left px-4 py-2 text-sm'
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}
