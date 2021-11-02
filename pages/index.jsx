import { Fragment, useState } from 'react';

import Seo from '@/components/Seo';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import NextImage from '@/components/NextImage';

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <Seo templateTitle='Home' />

      <div className='bg-white'>
        {/* Mobile menu */}
        <Nav.Mobile open={open} setOpen={setOpen} />

        <header className='relative overflow-hidden'>
          {/* Top navigation */}
          <Nav.Desktop setOpen={setOpen} />

          {/* Hero section */}
          <div className='min-h-main flex flex-col justify-center relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static'>
            <div className='sm:max-w-lg'>
              <h1 className='text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl'>
                Summer styles are finally here
              </h1>
              <p className='mt-4 text-xl text-gray-500'>
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn&apos;t care if you live or
                die.
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
                      <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100'>
                          <img
                            src='/images/1.jpg'
                            alt=''
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                        <div className='w-44 h-64 rounded-lg overflow-hidden'>
                          <img
                            src='/images/2.jpg'
                            alt=''
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                      </div>
                      <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='w-44 h-64 rounded-lg overflow-hidden'>
                          <img
                            src='/images/3.jpg'
                            alt=''
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                        <div className='w-44 h-64 rounded-lg overflow-hidden'>
                          <img
                            src='/images/4.jpg'
                            alt=''
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                        <div className='w-44 h-64 rounded-lg overflow-hidden'>
                          <img
                            src='/images/5.jpg'
                            alt=''
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                      </div>
                      <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='w-44 h-64 rounded-lg overflow-hidden'>
                          <img
                            src='/images/6.jpg'
                            alt=''
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                        <div className='w-44 h-64 rounded-lg overflow-hidden'>
                          <img
                            src='/images/7.jpg'
                            alt=''
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href='#'
                  className='inline-block text-center bg-teal-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-teal-700'
                >
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Featured section */}
          <section aria-labelledby='cause-heading'>
            <div className='relative flex items-center min-h-[20rem] bg-teal-600 px-6 sm:px-12 lg:px-16'>
              <div className='max-w-3xl mx-auto flex flex-col items-center text-center'>
                <h2
                  id='cause-heading'
                  className='text-3xl font-extrabold tracking-tight text-white sm:text-4xl'
                >
                  Long-term thinking
                </h2>
                <p className='mt-3 text-xl text-white'>
                  We&apos;re committed to responsible, sustainable, and ethical
                  manufacturing. Our small-scale approach allows us to focus on
                  quality and reduce our impact. We&apos;re doing our best to
                  delay the inevitable heat-death of the universe.
                </p>
                <a
                  href='#'
                  className='mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
                >
                  Read our story
                </a>
              </div>
            </div>
          </section>

          {/* Favorites section */}
          <section aria-labelledby='favorites-heading'>
            <div className='max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
              <div className='sm:flex sm:items-baseline sm:justify-between'>
                <h2
                  id='favorites-heading'
                  className='text-2xl font-extrabold tracking-tight text-gray-900'
                >
                  Our Favorites
                </h2>
                <a
                  href='#'
                  className='hidden text-sm font-semibold text-teal-600 hover:text-teal-500 sm:block'
                >
                  Browse all favorites<span aria-hidden='true'> &rarr;</span>
                </a>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8'>
                {favorites.map((favorite) => (
                  <div key={favorite.id} className='group relative'>
                    <NextImage
                      src={favorite.imageSrc}
                      alt={favorite.imageAlt}
                      className='w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3'
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
                  Browse all favorites<span aria-hidden='true'> &rarr;</span>
                </a>
              </div>
            </div>
          </section>

          {/* CTA section */}
          <section aria-labelledby='sale-heading'>
            <div className='pt-32 overflow-hidden sm:pt-14'>
              <div className='bg-gray-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='relative pt-48 pb-16 sm:pb-24'>
                    <div>
                      <h2
                        id='sale-heading'
                        className='text-4xl font-extrabold tracking-tight text-white md:text-5xl'
                      >
                        Final Stock.
                        <br />
                        Up to 50% off.
                      </h2>
                      <div className='mt-6 text-base'>
                        <a href='#' className='font-semibold text-white'>
                          Shop the sale<span aria-hidden='true'> &rarr;</span>
                        </a>
                      </div>
                    </div>

                    <div className='absolute -top-32 left-1/2 transform -translate-x-1/2 sm:top-6 sm:translate-x-0'>
                      <div className='ml-24 flex space-x-6 min-w-max sm:ml-3 lg:space-x-8'>
                        <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                          <div className='flex-shrink-0'>
                            <img
                              className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                              src='/images/7.jpg'
                              alt=''
                            />
                          </div>

                          <div className='mt-6 flex-shrink-0 sm:mt-0'>
                            <img
                              className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                              src='/images/8.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                          <div className='flex-shrink-0'>
                            <img
                              className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                              src='/images/1.jpg'
                              alt=''
                            />
                          </div>

                          <div className='mt-6 flex-shrink-0 sm:mt-0'>
                            <img
                              className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                              src='/images/2.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                          <div className='flex-shrink-0'>
                            <img
                              className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                              src='/images/3.jpg'
                              alt=''
                            />
                          </div>

                          <div className='mt-6 flex-shrink-0 sm:mt-0'>
                            <img
                              className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
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
