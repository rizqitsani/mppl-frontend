/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

import Seo from '@/components/Seo';
import Footer from '@/components/layout/Footer';
import Nav from '@/components/layout/Nav';
import NextImage from '@/components/NextImage';
import UnstyledLink from '@/components/links/UnstyledLink';
import CustomLink from '@/components/links/CustomLink';

const favorites = [
  {
    id: 1,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc: '/images/1.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc: '/images/2.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc: '/images/3.jpg',
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
];

export default function Home() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Seo templateTitle='Home' />

      <div className='bg-white'>
        {/* Mobile menu */}
        <Nav.Mobile open={open} setOpen={setOpen} />

        <header className='relative overflow-hidden'>
          {/* Top navigation */}
          <Nav.Desktop open={open} setOpen={setOpen} />

          {/* Hero section */}
          <div className='relative flex flex-col px-4 pt-16 mx-auto min-h-main sm:justify-center max-w-7xl sm:pt-0 sm:px-6 lg:px-8 sm:static'>
            <div className='sm:max-w-lg'>
              <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 font sm:text-6xl'>
                Style perhiasan perak terbaik sudah tiba di sini
              </h1>
              <p className='mt-4 text-xl text-gray-500'>
                Tahun ini, kami menghadirkan tampilan perhiasan perak yang
                sesuai trend era kini. Tidak perlu takut lagi untuk tampil
                percaya diri di hadapan dunia.
              </p>
            </div>
            <div>
              <div className='mt-10'>
                {/* Decorative image grid */}
                <div
                  aria-hidden='true'
                  className='pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full'
                >
                  <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                    <div className='flex items-center space-x-6 lg:space-x-8'>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 overflow-hidden rounded-lg w-44 sm:opacity-0 lg:opacity-100'>
                          <img
                            src='/images/1.jpg'
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </div>
                        <div className='h-64 overflow-hidden rounded-lg w-44 sm:opacity-0 lg:opacity-100'>
                          <img
                            src='/images/2.jpg'
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 overflow-hidden rounded-lg w-44'>
                          <img
                            src='/images/3.jpg'
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </div>
                        <div className='h-64 overflow-hidden rounded-lg w-44'>
                          <img
                            src='/images/4.jpg'
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </div>
                        <div className='h-64 overflow-hidden rounded-lg w-44'>
                          <img
                            src='/images/5.jpg'
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 overflow-hidden rounded-lg w-44'>
                          <img
                            src='/images/6.jpg'
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </div>
                        <div className='h-64 overflow-hidden rounded-lg w-44'>
                          <img
                            src='/images/7.jpg'
                            alt=''
                            className='object-cover object-center w-full h-full'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <UnstyledLink
                  href='/products'
                  className='inline-block px-8 py-3 font-medium text-center text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700'
                >
                  Koleksi Produk
                </UnstyledLink>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Featured section */}
          <section aria-labelledby='cause-heading'>
            <div className='relative flex items-center min-h-[20rem] bg-teal-600 px-6 sm:px-12 lg:px-16'>
              <div className='flex flex-col items-center max-w-3xl mx-auto text-center'>
                <h2
                  id='cause-heading'
                  className='text-3xl font-extrabold tracking-tight text-white sm:text-4xl'
                >
                  Visi Kami
                </h2>
                <p className='mt-3 text-xl text-white'>
                  Kami bertanggung jawab dalam mengembangkan produk yang
                  berdampak secara etis. Kami menghadirkan produk yang akan
                  membantu Anda memenuhi kebutuhan hiasan diri terbaik dan
                  terlengkap. Keamanan dan estetika Anda menjadi prioritas kami.
                </p>
                <a
                  href='#'
                  className='block w-full px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100 sm:w-auto'
                >
                  Tentang Kami
                </a>
              </div>
            </div>
          </section>

          {/* Favorites section */}
          <section aria-labelledby='favorites-heading'>
            <div className='px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8'>
              <div className='sm:flex sm:items-baseline sm:justify-between'>
                <h2
                  id='favorites-heading'
                  className='text-2xl font-extrabold tracking-tight text-gray-900'
                >
                  Favorit Kami
                </h2>
                <UnstyledLink
                  href='/products'
                  className='hidden text-sm font-semibold text-teal-600 hover:text-teal-500 sm:block'
                >
                  Kunjungi semua produk favorit
                  <span aria-hidden='true'> &rarr;</span>
                </UnstyledLink>
              </div>

              <div className='grid grid-cols-1 mt-6 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8'>
                {favorites.map((favorite) => (
                  <div key={favorite.id} className='relative group'>
                    <NextImage
                      src={favorite.imageSrc}
                      alt={favorite.imageAlt}
                      className='w-full overflow-hidden rounded-lg h-96 group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3'
                      imgClassName='w-full h-full object-center object-cover'
                      width='420'
                      height='420'
                      priority
                    />
                    <h3 className='mt-4 text-base font-semibold text-gray-900'>
                      <a href={favorite.href}>
                        <span className='absolute inset-0' />
                        {favorite.name}
                      </a>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      {favorite.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className='mt-6 sm:hidden'>
                <a
                  href='#'
                  className='block text-sm font-semibold text-teal-600 hover:text-teal-500'
                >
                  Kunjungi semua produk favorit
                  <span aria-hidden='true'> &rarr;</span>
                </a>
              </div>
            </div>
          </section>

          {/* CTA section */}
          <section aria-labelledby='sale-heading'>
            <div className='pt-32 overflow-hidden sm:pt-14'>
              <div className='bg-gray-800'>
                <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                  <div className='relative pt-48 pb-16 sm:pb-24'>
                    <div>
                      <h2
                        id='sale-heading'
                        className='text-4xl font-extrabold tracking-tight text-white md:text-5xl'
                      >
                        Diskon Produk.
                        <br />
                        Up to 50% off.
                      </h2>
                      <div className='mt-6 text-base'>
                        <CustomLink
                          href='/products'
                          className='font-semibold text-white animated-underline'
                        >
                          Kunjungi produk<span aria-hidden='true'> &rarr;</span>
                        </CustomLink>
                      </div>
                    </div>

                    <div className='absolute transform -translate-x-1/2 -top-32 left-1/2 sm:top-6 sm:translate-x-0'>
                      <div className='flex ml-24 space-x-6 min-w-max sm:ml-3 lg:space-x-8'>
                        <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                          <div className='flex-shrink-0'>
                            <img
                              className='object-cover w-64 h-64 rounded-lg md:h-72 md:w-72'
                              src='/images/7.jpg'
                              alt=''
                            />
                          </div>

                          <div className='flex-shrink-0 mt-6 sm:mt-0'>
                            <img
                              className='object-cover w-64 h-64 rounded-lg md:h-72 md:w-72'
                              src='/images/8.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                          <div className='flex-shrink-0'>
                            <img
                              className='object-cover w-64 h-64 rounded-lg md:h-72 md:w-72'
                              src='/images/1.jpg'
                              alt=''
                            />
                          </div>

                          <div className='flex-shrink-0 mt-6 sm:mt-0'>
                            <img
                              className='object-cover w-64 h-64 rounded-lg md:h-72 md:w-72'
                              src='/images/2.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                          <div className='flex-shrink-0'>
                            <img
                              className='object-cover w-64 h-64 rounded-lg md:h-72 md:w-72'
                              src='/images/3.jpg'
                              alt=''
                            />
                          </div>

                          <div className='flex-shrink-0 mt-6 sm:mt-0'>
                            <img
                              className='object-cover w-64 h-64 rounded-lg md:h-72 md:w-72'
                              src='/images/4.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
