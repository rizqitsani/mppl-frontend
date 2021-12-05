import * as React from 'react';
import { useQuery } from 'react-query';
import { HiInformationCircle } from 'react-icons/hi';

import useRQWithToast from '@/hooks/useRQWithToast';

import NextImage from '@/components/NextImage';
import Button from '@/components/Button';
import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import OrderDetail from '@/components/orders/OrderDetail';

import { baseUrl } from '@/lib/axios';
import { formatDate, formatRupiah } from '@/lib/helper';
import { Transaction, TransactionApi } from '@/types/api';

export default function OrderListPage() {
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [currentTransaction, setCurrentTransaction] =
    React.useState<Transaction>(null);

  const { data: queryData } = useRQWithToast(
    useQuery<TransactionApi, Error>('/transaction')
  );
  const data = queryData?.data ?? [];

  return (
    <Layout>
      <Seo templateTitle='Pesanan Saya' />

      {currentTransaction && (
        <OrderDetail
          data={currentTransaction}
          open={showDetailModal}
          setOpen={setShowDetailModal}
        />
      )}

      <div className='py-16 lg:pb-24 min-h-minimal layout'>
        <div className='max-w-xl'>
          <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
            Riwayat Pemesanan
          </h1>
        </div>

        <div className='mt-10'>
          <h2 className='sr-only'>Riwayat Pemesanan</h2>

          {data.length === 0 ? (
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
                    Kamu belum pernah melakukan transaksi.
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
            <div className='space-y-16'>
              {data.map((transaction) => (
                <div
                  key={transaction.id}
                  className='overflow-hidden rounded-lg shadow-lg'
                >
                  <h3 className='sr-only'>
                    Dibeli pada {transaction.transaction_time}
                  </h3>

                  <div className='px-4 py-6 bg-gray-50 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8'>
                    <dl className='flex-auto space-y-6 text-sm text-gray-600 divide-y divide-gray-200 sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-2/3 lg:flex-none lg:gap-x-8'>
                      <div className='flex justify-between sm:block'>
                        <dt className='font-medium text-gray-900'>
                          Tanggal Pembelian
                        </dt>
                        <dd className='sm:mt-1'>
                          {formatDate(transaction.transaction_time)}
                        </dd>
                      </div>
                      <div className='flex justify-between pt-6 sm:block sm:pt-0'>
                        <dt className='font-medium text-gray-900'>
                          No. Invoice
                        </dt>
                        <dd className='sm:mt-1'>{transaction.id}</dd>
                      </div>
                      <div className='flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0'>
                        <dt>Total</dt>
                        <dd className='sm:mt-1'>
                          {formatRupiah(
                            transaction.total +
                              transaction.shipping_cost +
                              transaction.insurance_cost
                          )}
                        </dd>
                      </div>
                      <div className='flex justify-between pt-6 sm:block sm:pt-0'>
                        <dt className='font-medium text-gray-900'>Status</dt>
                        <dd className='sm:mt-1'>
                          {transaction.shipping_status}
                        </dd>
                      </div>
                    </dl>
                    <Button
                      variant='primary'
                      onClick={() => {
                        setShowDetailModal(true);
                        setCurrentTransaction(transaction);
                      }}
                    >
                      Lihat Detail
                      <span className='sr-only'>
                        for order {transaction.id}
                      </span>
                    </Button>
                  </div>

                  <table className='w-full mt-4 text-gray-500 sm:mt-6'>
                    <caption className='sr-only'>Produk</caption>
                    <thead className='text-sm text-left text-gray-500 sr-only sm:not-sr-only'>
                      <tr>
                        <th
                          scope='col'
                          className='px-8 py-3 font-normal sm:w-2/5 lg:w-1/3'
                        >
                          Produk
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/5 py-3 pr-8 font-normal sm:table-cell'
                        >
                          Harga
                        </th>
                        <th
                          scope='col'
                          className='w-0 py-3 pr-8 font-normal text-right'
                        >
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-sm border-b border-gray-200 divide-y divide-gray-200 sm:border-t'>
                      {transaction.items.map((item) => (
                        <tr key={item.id}>
                          <td className='px-8 py-6'>
                            <div className='flex items-center'>
                              <div className='w-16 h-16 overflow-hidden rounded-md'>
                                <NextImage
                                  src={`${baseUrl}/static/images/${item.product.photos[0].photo_link}`}
                                  alt={item.product.name}
                                  className='object-cover object-center w-full h-full'
                                  width='640'
                                  height='640'
                                />
                              </div>
                              <div>
                                <div className='ml-6 font-medium text-gray-900'>
                                  {item.product.name}
                                </div>
                                <div className='mt-1 sm:hidden'>
                                  {formatRupiah(item.product.price)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='hidden py-6 pr-8 sm:table-cell'>
                            {formatRupiah(item.product.price)}
                          </td>
                          <td className='py-6 pr-8 font-medium text-right whitespace-nowrap'>
                            <UnstyledLink
                              href={`/products/${item.product.id}`}
                              className='text-teal-600'
                            >
                              Lihat
                              <span className='hidden lg:inline'> Produk</span>
                              <span className='sr-only'>
                                , {item.product.name}
                              </span>
                            </UnstyledLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
