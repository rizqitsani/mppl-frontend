import * as React from 'react';
import { useRouter } from 'next/router';
import { Dialog, Menu, Transition } from '@headlessui/react';

import { HiOutlineX, HiSelector } from 'react-icons/hi';
import clsx from 'clsx';

import { useAuthDispatch, useAuthState } from '@/contexts/AuthContext';

import { AdminNavigationType } from '@/components/layout/AdminLayout';

import { getAvatarUrl } from '@/lib/helper';
import NextImage from '../NextImage';

type AdminSidebarProps = {
  navigation: AdminNavigationType[];
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
};

export default function AdminSidebar({
  navigation,
  setSidebarOpen,
  sidebarOpen,
}: AdminSidebarProps) {
  const router = useRouter();

  const dispatch = useAuthDispatch();
  const { user } = useAuthState();

  const handleLogout = () => {
    dispatch('LOGOUT');
    router.replace('/signin');
  };

  return (
    <>
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 z-40 flex lg:hidden'
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 pt-2 -mr-12'>
                  <button
                    className='flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <HiOutlineX
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex items-center justify-center flex-shrink-0 px-4'>
                <div className='w-12 h-12'>
                  <NextImage
                    src='/images/logo.png'
                    alt='Logo'
                    height='1200'
                    width='1200'
                    className='w-full h-full'
                  />
                </div>
              </div>
              <div className='flex-1 h-0 mt-5 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                          'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={clsx(
                            item.current
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 h-6 w-6'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64 pt-5 pb-4 bg-gray-100 border-r border-gray-200'>
          <div className='flex items-center justify-center flex-shrink-0 px-6'>
            <div className='w-12 h-12'>
              <NextImage
                src='/images/logo.png'
                alt='Logo'
                height='1200'
                width='1200'
                className='w-full h-full'
              />
            </div>
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-1 h-0 overflow-y-auto'>
            {/* User account dropdown */}
            <Menu
              as='div'
              className='relative inline-block px-3 mt-6 text-left'
            >
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className='group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-100 focus:ring-teal-100'>
                      <span className='flex items-center justify-between w-full'>
                        <span className='flex items-center justify-between min-w-0 space-x-3'>
                          <div className='w-10 h-10 overflow-hidden rounded-full'>
                            <NextImage
                              src={getAvatarUrl('Admin')}
                              alt='Logo'
                              height='64'
                              width='64'
                              className='w-full h-full'
                            />
                          </div>
                          <span className='flex flex-col flex-1 min-w-0'>
                            <span className='text-sm font-medium text-gray-900 truncate'>
                              {user?.role === 'admin' ? 'Admin' : user?.nama}
                            </span>
                          </span>
                        </span>
                        <HiSelector
                          className='flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500'
                          aria-hidden='true'
                        />
                      </span>
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
                      className='absolute left-0 right-0 z-10 mx-3 mt-1 origin-top bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
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
            {/* Navigation */}
            <nav className='px-3 mt-6'>
              <div className='space-y-2'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      item.current
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={clsx(
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6'
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
