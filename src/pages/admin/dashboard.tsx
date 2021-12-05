import * as React from 'react';
import { useQuery } from 'react-query';

import {
  HiOutlineCursorClick,
  HiOutlineMailOpen,
  HiOutlineUsers,
} from 'react-icons/hi';

import useRQWithToast from '@/hooks/useRQWithToast';

import Seo from '@/components/Seo';
import AdminLayout from '@/components/layout/AdminLayout';

import { StatisticsApi } from '@/types/api';
import UnstyledLink from '@/components/links/UnstyledLink';

export default function DashboardAdminPage() {
  const { data: queryData } = useRQWithToast(
    useQuery<StatisticsApi, Error>('/statistics')
  );
  const data = queryData?.data;

  const stats = [
    {
      id: 1,
      name: 'Total Users',
      href: '#',
      stat: data?.user,
      icon: HiOutlineUsers,
    },
    {
      id: 2,
      name: 'Total Products',
      href: '/admin/products',
      stat: data?.product.active,
      icon: HiOutlineMailOpen,
    },
    {
      id: 3,
      name: 'Total Transaction',
      href: '/admin/transactions',
      stat: `Rp ${data?.transaction || 0}`,
      icon: HiOutlineCursorClick,
    },
  ];

  return (
    <>
      <Seo templateTitle='Dashboard Admin' />

      <AdminLayout>
        {/* Page title & actions */}
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200 sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-bold leading-6 text-gray-900 sm:truncate'>
              Home
            </h1>
          </div>
        </div>

        {/* Pinned projects */}
        <div className='px-4 mt-6 sm:px-6 lg:px-8'>
          <dl className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3'>
            {stats.map((item) => (
              <div
                key={item.id}
                className='relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6'
              >
                <dt>
                  <div className='absolute p-3 bg-teal-500 rounded-md'>
                    <item.icon
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                    />
                  </div>
                  <p className='ml-16 text-sm font-medium text-gray-500 truncate'>
                    {item.name}
                  </p>
                </dt>
                <dd className='flex items-baseline pb-6 ml-16 sm:pb-7'>
                  <p className='text-2xl font-bold text-gray-900 truncate'>
                    {item.stat}
                  </p>
                  <div className='absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6'>
                    <div className='text-sm'>
                      <UnstyledLink
                        href={item.href}
                        className='font-medium text-teal-600 hover:text-teal-500'
                      >
                        {' '}
                        View all
                        <span className='sr-only'> {item.name} stats</span>
                      </UnstyledLink>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </AdminLayout>
    </>
  );
}
