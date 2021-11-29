import * as React from 'react';
import { HiCheck, HiClock, HiQuestionMarkCircle, HiX } from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';
import Layout from '@/components/layout/Layout';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: '/images/1.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc: '/images/2.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: '/images/3.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
];

export default function CartPage() {
  return (
    <Layout>
      <main className='pt-16 pb-24 layout'>
        <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Cart
        </h1>

        <form className='mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16'>
          <section aria-labelledby='cart-heading' className='lg:col-span-7'>
            <h2 id='cart-heading' className='sr-only'>
              Items in your shopping cart
            </h2>

            <ul
              role='list'
              className='border-t border-b border-gray-200 divide-y divide-gray-200'
            >
              {products.map((product, productIdx) => (
                <li key={product.id} className='flex py-6 sm:py-10'>
                  <div className='flex-shrink-0'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className='object-cover object-center w-24 h-24 rounded-md sm:w-48 sm:h-48'
                    />
                  </div>

                  <div className='flex flex-col justify-between flex-1 ml-4 sm:ml-6'>
                    <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                      <div>
                        <div className='flex justify-between'>
                          <h3 className='text-sm'>
                            <a
                              href={product.href}
                              className='font-medium text-gray-700 hover:text-gray-800'
                            >
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className='flex mt-1 text-sm'>
                          <p className='text-gray-500'>{product.color}</p>
                          {product.size ? (
                            <p className='pl-4 ml-4 text-gray-500 border-l border-gray-200'>
                              {product.size}
                            </p>
                          ) : null}
                        </div>
                        <p className='mt-1 text-sm font-medium text-gray-900'>
                          {product.price}
                        </p>
                      </div>

                      <div className='mt-4 sm:mt-0 sm:pr-9'>
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className='sr-only'
                        >
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className='max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                        </select>

                        <div className='absolute top-0 right-0'>
                          <button
                            type='button'
                            className='inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500'
                          >
                            <span className='sr-only'>Remove</span>
                            <HiX className='w-5 h-5' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className='flex mt-4 space-x-2 text-sm text-gray-700'>
                      {product.inStock ? (
                        <HiCheck
                          className='flex-shrink-0 w-5 h-5 text-green-500'
                          aria-hidden='true'
                        />
                      ) : (
                        <HiClock
                          className='flex-shrink-0 w-5 h-5 text-gray-300'
                          aria-hidden='true'
                        />
                      )}

                      <span>
                        {product.inStock
                          ? 'In stock'
                          : `Ships in ${product.leadTime}`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby='summary-heading'
            className='px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5'
          >
            <h2
              id='summary-heading'
              className='text-lg font-medium text-gray-900'
            >
              Order summary
            </h2>

            <dl className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <dt className='text-sm text-gray-600'>Subtotal</dt>
                <dd className='text-sm font-medium text-gray-900'>$99.00</dd>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                <dt className='flex items-center text-sm text-gray-600'>
                  <span>Shipping estimate</span>
                  <a
                    href='#'
                    className='flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>
                      Learn more about how shipping is calculated
                    </span>
                    <HiQuestionMarkCircle
                      className='w-5 h-5'
                      aria-hidden='true'
                    />
                  </a>
                </dt>
                <dd className='text-sm font-medium text-gray-900'>$5.00</dd>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                <dt className='flex text-sm text-gray-600'>
                  <span>Tax estimate</span>
                  <a
                    href='#'
                    className='flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>
                      Learn more about how tax is calculated
                    </span>
                    <HiQuestionMarkCircle
                      className='w-5 h-5'
                      aria-hidden='true'
                    />
                  </a>
                </dt>
                <dd className='text-sm font-medium text-gray-900'>$8.32</dd>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                <dt className='text-base font-medium text-gray-900'>
                  Order total
                </dt>
                <dd className='text-base font-medium text-gray-900'>$112.32</dd>
              </div>
            </dl>

            <div className='mt-6'>
              <UnstyledLink
                href='/checkout'
                className='flex justify-center w-full px-4 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500'
              >
                Checkout
              </UnstyledLink>
            </div>
          </section>
        </form>
      </main>
    </Layout>
  );
}
