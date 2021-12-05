import * as React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { HiInformationCircle, HiX } from 'react-icons/hi';

import useCartStore from '@/store/useCartStore';

import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import UnstyledLink from '@/components/links/UnstyledLink';
import Layout from '@/components/layout/Layout';

import axiosClient, { baseUrl } from '@/lib/axios';
import { defaultToastMessage } from '@/lib/constant';
import { formatRupiah } from '@/lib/helper';
import { CartApi } from '@/types/api';
import ButtonLink from '@/components/links/ButtonLink';

export default function CartPage() {
  const populate = useCartStore.usePopulate();
  const remove = useCartStore.useRemove();
  const update = useCartStore.useUpdate();

  const queryClient = useQueryClient();
  const { data: queryData } = useQuery<CartApi, Error>('/cart');
  const data = queryData?.data;

  const hasPreorder = data?.items.some((item) => item.product.stock === 0);

  if (data) {
    populate(data.items, data.total);
  }

  const handleUpdate = (
    event: React.ChangeEvent<HTMLSelectElement>,
    productId
  ) => {
    toast.promise(
      axiosClient.put('/cart', {
        product_id: productId,
        quantity: event.target.value,
      }),
      {
        ...defaultToastMessage,
        success: 'Berhasil memperbarui keranjang',
      }
    );

    queryClient.refetchQueries(['/cart']);
    update(productId, Number(event.target.value));
  };

  const handleRemove = (productId) => {
    toast.promise(
      axiosClient.delete('/cart', { data: { product_id: productId } }),
      {
        ...defaultToastMessage,
        success: 'Berhasil menghapus item dari keranjang',
      }
    );

    queryClient.refetchQueries(['/cart']);
    remove(productId);
  };

  return (
    <Layout>
      <Seo templateTitle='Keranjang' />

      <main className='pt-16 pb-24 min-h-minimal layout'>
        <h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Keranjang
        </h1>

        <form className='mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16'>
          {data?.items.length === 0 ? (
            <div className='p-4 rounded-md bg-blue-50 lg:col-span-12'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <HiInformationCircle
                    className='w-5 h-5 text-blue-400'
                    aria-hidden='true'
                  />
                </div>
                <div className='flex-1 ml-3 md:flex md:justify-between'>
                  <p className='text-sm text-blue-700'>
                    Keranjangmu masih kosong.
                  </p>
                  <p className='mt-3 text-sm md:mt-0 md:ml-6'>
                    <UnstyledLink
                      href='/products'
                      className='font-medium text-blue-700 whitespace-nowrap hover:text-blue-600'
                    >
                      Lihat Daftar Produk <span aria-hidden='true'>&rarr;</span>
                    </UnstyledLink>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <section aria-labelledby='cart-heading' className='lg:col-span-7'>
                <h2 id='cart-heading' className='sr-only'>
                  Items in your shopping cart
                </h2>

                <ul
                  role='list'
                  className='border-t border-b border-gray-200 divide-y divide-gray-200'
                >
                  {data?.items.map((item) => (
                    <li key={item.id} className='flex py-6 sm:py-10'>
                      <div className='flex-shrink-0'>
                        <div className='w-24 h-24 overflow-hidden rounded-md sm:w-48 sm:h-48'>
                          <NextImage
                            src={`${baseUrl}/static/images/${item.product.photos[0].photo_link}`}
                            alt={item.product.name}
                            className='object-cover object-center w-full h-full'
                            width='640'
                            height='640'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col justify-between flex-1 ml-4 sm:ml-6'>
                        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                          <div>
                            <div className='flex justify-between'>
                              <h3 className='text-sm'>
                                <UnstyledLink
                                  href={`/products/${item.product_id}`}
                                  className='font-medium text-gray-700 hover:text-gray-800'
                                >
                                  {item.product.name}
                                </UnstyledLink>
                              </h3>
                            </div>
                            <p className='mt-1 text-sm font-medium text-gray-500'>
                              {formatRupiah(item.product.price)}
                            </p>
                            {item.product.stock === 0 && (
                              <div className='mt-1'>
                                <span className='inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800'>
                                  Preorder (2 minggu)
                                </span>
                              </div>
                            )}
                          </div>

                          <div className='mt-4 sm:mt-0 sm:pr-9'>
                            {item.product.stock > 0 && (
                              <>
                                <label
                                  htmlFor={`quantity-${item.id}`}
                                  className='sr-only'
                                >
                                  Quantity, {item.product.name}
                                </label>
                                <select
                                  id={`quantity-${item.id}`}
                                  name={`quantity-${item.id}`}
                                  className='max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
                                  onChange={(e) =>
                                    handleUpdate(e, item.product_id)
                                  }
                                >
                                  {[...Array(4)].map((_, i) => (
                                    <option
                                      key={i}
                                      value={i + 1}
                                      selected={item.quantity === i + 1}
                                    >
                                      {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}

                            <div className='absolute top-0 right-0'>
                              <button
                                type='button'
                                className='inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500'
                                onClick={() => handleRemove(item.product_id)}
                              >
                                <span className='sr-only'>Remove</span>
                                <HiX className='w-5 h-5' aria-hidden='true' />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby='summary-heading'
                className='px-3 py-6 mt-16 rounded-lg shadow-md sm:p-6 lg:p-6 lg:mt-0 lg:col-span-5'
              >
                <h2
                  id='summary-heading'
                  className='text-lg font-bold text-gray-900'
                >
                  Ringkasan Belanja
                </h2>

                <dl className='mt-6 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm text-gray-600'>Total Harga</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      {formatRupiah(data?.total)}
                    </dd>
                  </div>

                  <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                    <dt className='text-base font-bold text-gray-900'>
                      Total Harga
                    </dt>
                    <dd className='text-base font-medium text-gray-900'>
                      {formatRupiah(data?.total)}
                    </dd>
                  </div>
                </dl>

                <div className='mt-4'>
                  <ButtonLink variant='primary' href='/checkout' isFullWidth>
                    Beli {hasPreorder && '(Preorder)'}
                  </ButtonLink>
                </div>
              </section>
            </>
          )}
        </form>
      </main>
    </Layout>
  );
}
