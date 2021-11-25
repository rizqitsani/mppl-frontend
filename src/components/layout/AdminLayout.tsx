import * as React from 'react';

import { IconType } from 'react-icons';
import { HiOutlineDatabase, HiOutlineHome } from 'react-icons/hi';
import { IoWalletOutline } from 'react-icons/io5';

import AdminHeader from '@/components/layout/AdminHeader';
import AdminSidebar from '@/components/layout/AdminSidebar';

export type AdminNavigationType = {
  name: string;
  href: string;
  icon: IconType;
  current: boolean;
};

const navigation: AdminNavigationType[] = [
  {
    name: 'Home',
    href: '/admin/dashboard',
    icon: HiOutlineHome,
    current: true,
  },
  {
    name: 'Transactions',
    href: '/admin/transaction',
    icon: IoWalletOutline,
    current: false,
  },
  {
    name: 'Products',
    href: '/admin/product',
    icon: HiOutlineDatabase,
    current: false,
  },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className='flex h-screen overflow-hidden bg-white'>
      <AdminSidebar
        navigation={navigation}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />

      <div className='flex flex-col flex-1 w-0 overflow-hidden'>
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className='relative z-0 flex-1 overflow-y-auto focus:outline-none'>
          {children}
        </main>
      </div>
    </div>
  );
}
