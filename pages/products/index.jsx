import { useState } from 'react';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FilterMenu from '@/components/products/FilterMenu';
import UnstyledLink from '@/components/links/UnstyledLink';

const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc: '/images/1.jpg',
    imageAlt:
      'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description:
      'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: '/images/2.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  // More products...
];

export default function ProductListPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Nav.Mobile open={mobileMenuOpen} setOpen={setMobileMenuOpen} />

      <header className='relative bg-white'>
        <Nav.Desktop open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      </header>

      <div>
        {/* Mobile filter dialog */}
        <FilterMenu.Mobile
          open={mobileFiltersOpen}
          setOpen={setMobileFiltersOpen}
        />

        <main className='max-w-2xl px-4 mx-auto lg:max-w-7xl lg:px-8'>
          <div className='pt-24 pb-10 border-b border-gray-200'>
            <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
              New Arrivals
            </h1>
            <p className='mt-4 text-base text-gray-500'>
              Checkout out the latest release of Basic Tees, new and improved
              with four openings!
            </p>
          </div>

          <div className='pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
            <FilterMenu.Desktop
              open={mobileFiltersOpen}
              setOpen={setMobileFiltersOpen}
            />

            <section
              aria-labelledby='product-heading'
              className='mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3'
            >
              <h2 id='product-heading' className='sr-only'>
                Products
              </h2>

              <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className='relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group'
                  >
                    <div className='bg-gray-200 aspect-w-3 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-96'>
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className='object-cover object-center w-full h-full sm:w-full sm:h-full'
                      />
                    </div>
                    <div className='flex flex-col flex-1 p-4 space-y-2'>
                      <h3 className='text-sm font-medium text-gray-900'>
                        <UnstyledLink href='/products/1'>
                          <span
                            aria-hidden='true'
                            className='absolute inset-0'
                          />
                          {product.name}
                        </UnstyledLink>
                      </h3>
                      <p className='text-sm text-gray-500'>
                        {product.description}
                      </p>
                      <div className='flex flex-col justify-end flex-1'>
                        <p className='text-sm italic text-gray-500'>
                          {product.options}
                        </p>
                        <p className='text-base font-medium text-gray-900'>
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
