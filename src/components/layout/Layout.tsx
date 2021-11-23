import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Nav from '@/components/layout/Nav';
import PrivateRoute from '@/components/PrivateRoute';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const protectedRoutes = ['/cart', '/checkout', '/orders', '/orders/[id]'];

  return (
    <PrivateRoute protectedRoutes={protectedRoutes}>
      <div className='bg-white'>
        {/* Mobile menu */}
        <Nav.Mobile open={open} setOpen={setOpen} />

        <header className='sticky top-0 z-10 bg-white'>
          <Nav.Desktop open={open} setOpen={setOpen} />
        </header>
        {children}
        <Footer />
      </div>
    </PrivateRoute>
  );
}
