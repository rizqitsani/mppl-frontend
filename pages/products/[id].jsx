import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  HiOutlineCurrencyDollar,
  HiOutlineGlobe,
  HiOutlineHeart,
  HiStar,
} from 'react-icons/hi';
import clsx from 'clsx';

import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import UnstyledLink from '@/components/links/UnstyledLink';

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: '/images/1.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 2,
      name: 'Angled view',
      src: '/images/2.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
      id: 3,
      name: 'Angled view',
      src: '/images/3.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
  ],
  colors: [
    {
      name: 'Washed Black',
      bgColor: 'bg-gray-700',
      selectedColor: 'ring-gray-700',
    },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    {
      name: 'Washed Gray',
      bgColor: 'bg-gray-500',
      selectedColor: 'ring-gray-500',
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
};

const policies = [
  {
    name: 'International delivery',
    icon: HiOutlineGlobe,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: HiOutlineCurrencyDollar,
    description: "Don't look at other tees",
  },
];

export default function ProductDetailPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className='bg-white'>
      <Nav.Mobile open={open} setOpen={setOpen} />

      <header className='relative bg-white'>
        <Nav.Desktop open={open} setOpen={setOpen} />
      </header>

      <main className='mx-auto max-w-7xl sm:pt-16 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          {/* Product */}
          <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
            {/* Image gallery */}
            <Tab.Group as='div' className='flex flex-col-reverse'>
              {/* Image selector */}
              <div className='hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none'>
                <Tab.List className='grid grid-cols-4 gap-6'>
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className='relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50'
                    >
                      {({ selected }) => (
                        <>
                          <span className='sr-only'>{image.name}</span>
                          <span className='absolute inset-0 overflow-hidden rounded-md'>
                            <img
                              src={image.src}
                              alt=''
                              className='object-cover object-center w-full h-full'
                            />
                          </span>
                          <span
                            className={clsx(
                              selected ? 'ring-teal-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden='true'
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className='w-full aspect-w-1 aspect-h-1'>
                {product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className='object-cover object-center w-full h-full sm:rounded-lg'
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className='px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0'>
              <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                {product.name}
              </h1>

              <div className='mt-3'>
                <h2 className='sr-only'>Product information</h2>
                <p className='text-3xl text-gray-900'>{product.price}</p>
              </div>

              {/* Reviews */}
              <div className='mt-3'>
                <h3 className='sr-only'>Reviews</h3>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <HiStar
                        key={rating}
                        className={clsx(
                          product.rating > rating
                            ? 'text-teal-500'
                            : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden='true'
                      />
                    ))}
                  </div>
                  <p className='sr-only'>{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className='mt-6'>
                <h3 className='sr-only'>Description</h3>

                <div
                  className='space-y-6 text-base text-gray-700'
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form className='mt-6'>
                <div className='flex mt-10 sm:flex-col1'>
                  <UnstyledLink
                    href='/cart'
                    className='flex items-center justify-center flex-1 max-w-xs px-8 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500 sm:w-full'
                  >
                    Add to bag
                  </UnstyledLink>
                  {/* <button
                    type='submit'
                    className='flex items-center justify-center flex-1 max-w-xs px-8 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500 sm:w-full'
                  >
                    Add to bag
                  </button> */}

                  <button
                    type='button'
                    className='flex items-center justify-center px-3 py-3 ml-4 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500'
                  >
                    <HiOutlineHeart
                      className='flex-shrink-0 w-6 h-6'
                      aria-hidden='true'
                    />
                    <span className='sr-only'>Add to favorites</span>
                  </button>
                </div>
              </form>

              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-900'>
                  Description
                </h2>

                <div
                  className='mt-4 prose-sm prose text-gray-500'
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div className='pt-8 mt-8 border-t border-gray-200'>
                <h2 className='text-sm font-medium text-gray-900'>
                  Fabric &amp; Care
                </h2>

                <div className='mt-4 prose-sm prose text-gray-500'>
                  <ul role='list'>
                    {product.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby='policies-heading' className='mt-10'>
                <h2 id='policies-heading' className='sr-only'>
                  Our Policies
                </h2>

                <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className='p-6 text-center border border-gray-200 rounded-lg bg-gray-50'
                    >
                      <dt>
                        <policy.icon
                          className='flex-shrink-0 w-6 h-6 mx-auto text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='mt-4 text-sm font-medium text-gray-900'>
                          {policy.name}
                        </span>
                      </dt>
                      <dd className='mt-1 text-sm text-gray-500'>
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
