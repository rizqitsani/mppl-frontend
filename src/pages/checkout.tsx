import * as React from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { RadioGroup } from '@headlessui/react';

import { HiCheckCircle } from 'react-icons/hi';
import clsx from 'clsx';

import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';

import Button from '@/components/Button';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';

import axiosClient from '@/lib/axios';
import { formatRupiah } from '@/lib/helper';
import { TransactionTokenApi } from '@/types/api';
import { defaultToastMessage } from '@/lib/constant';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snap: any;
  }
}

const deliveryMethods = [
  {
    id: 1,
    title: 'Reguler',
    turnaround: '3–6 hari',
    price: 22000,
  },
  { id: 2, title: 'Express', turnaround: '1-2 hari', price: 27000 },
];

export default function CheckoutPage() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = React.useState(
    deliveryMethods[0]
  );

  const router = useRouter();

  const user = useAuthStore.useUser();
  const items = useCartStore.useItems();
  const cartTotal = useCartStore.useTotal();

  if (items.length === 0) {
    router.replace('/cart');
  }

  const insuranceTotal =
    Math.ceil(((cartTotal + selectedDeliveryMethod.price) * 0.4) / 100 / 100) *
    100;
  const total = cartTotal + selectedDeliveryMethod.price + insuranceTotal;

  React.useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidtransClientKey = 'SB-Mid-client-eR9yrTMdYx93pyak';

    const scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleCheckout = async () => {
    toast.promise(
      axiosClient
        .post<TransactionTokenApi>('/transaction/token', {
          total: cartTotal,
          additional: selectedDeliveryMethod.price + insuranceTotal,
        })
        .then((res) => {
          const { token, id } = res.data.data;
          window.snap.pay(token, {
            onError: function () {
              axiosClient.delete('/transaction/delete', {
                data: {
                  transaction_id: id,
                },
              });
            },
            onClose: function () {
              axiosClient.delete('/transaction/delete', {
                data: {
                  transaction_id: id,
                },
              });
            },
          });
        }),
      {
        ...defaultToastMessage,
        success: 'Berhasil melakukan pembayaran',
      }
    );
  };

  return (
    <Layout>
      <Seo templateTitle='Checkout' />

      <main className='pt-16 pb-24 layout'>
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          <h1 className='text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl'>
            Checkout
          </h1>

          <form className='mt-8 lg:grid lg:grid-cols-3 lg:gap-x-6 xl:gap-x-10'>
            <div className='space-y-6 divide-y-4 divide-gray-200 lg:col-span-2'>
              <div>
                <h2 className='text-base font-bold text-gray-900'>
                  Alamat Pengiriman
                </h2>

                <div className='pt-4 mt-2 space-y-1 text-sm border-t border-gray-200'>
                  <p className='font-semibold'>{user.name}</p>
                  <p>{user.phone}</p>
                  <p className='text-gray-500'>{user.address}</p>
                </div>
              </div>

              <div className='pt-6'>
                <h2 className='text-base font-bold text-gray-900'>Pesanan</h2>

                <ul role='list' className='divide-y divide-gray-200 '>
                  {items.map((item) => (
                    <li key={item.product_id} className='flex py-6 space-x-6'>
                      <div className='w-24 h-24 overflow-hidden rounded-md'>
                        <NextImage
                          src={`/images/product-${
                            (Math.floor(Math.random() * 3) % 2) + 1
                          }.jpg`}
                          alt={item.product.name}
                          className='object-cover object-center w-full h-full'
                          width='640'
                          height='640'
                        />
                      </div>
                      <div className='flex-auto space-y-1 text-sm font-medium'>
                        <h3 className='text-sm text-gray-900'>
                          <UnstyledLink href={`/products/${item.product_id}`}>
                            {item.product.name}
                          </UnstyledLink>
                        </h3>
                        <p className='text-gray-900'>
                          {formatRupiah(item.product.price)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='pt-6'>
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className='text-base font-bold text-gray-900'>
                    Metode Pengiriman
                  </RadioGroup.Label>

                  <div className='grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          clsx(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'ring-2 ring-teal-500' : '',
                            'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className='flex flex-1'>
                              <div className='flex flex-col'>
                                <RadioGroup.Label
                                  as='span'
                                  className='block text-sm font-medium text-gray-900'
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className='flex items-center mt-1 text-sm text-gray-500'
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-6 text-sm font-medium text-gray-900'
                                >
                                  {formatRupiah(deliveryMethod.price)}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                              <HiCheckCircle
                                className='w-5 h-5 text-teal-600'
                                aria-hidden='true'
                              />
                            ) : null}
                            <div
                              className={clsx(
                                active ? 'border' : 'border-2',
                                checked
                                  ? 'border-teal-500'
                                  : 'border-transparent',
                                'absolute -inset-px rounded-lg pointer-events-none'
                              )}
                              aria-hidden='true'
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order summary */}
            <section aria-labelledby='summary-heading'>
              <div className='px-3 py-6 mt-16 rounded-lg shadow-md sm:p-6 lg:p-6 lg:mt-0'>
                <h2
                  id='summary-heading'
                  className='text-base font-bold text-gray-900'
                >
                  Ringkasan Belanja
                </h2>

                <dl className='mt-6 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm text-gray-600'>Total Harga</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      {formatRupiah(cartTotal)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm text-gray-600'>
                      Total Ongkos Kirim
                    </dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      {formatRupiah(selectedDeliveryMethod.price)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm text-gray-600'>
                      Asuransi Pengiriman
                    </dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      {formatRupiah(insuranceTotal)}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                    <dt className='text-lg font-bold text-gray-900'>Total</dt>
                    <dd className='text-lg font-bold text-gray-900'>
                      {formatRupiah(total)}
                    </dd>
                  </div>
                </dl>

                <div className='mt-4'>
                  <Button
                    type='button'
                    variant='primary'
                    onClick={handleCheckout}
                    isFullWidth
                  >
                    Pilih Pembayaran
                  </Button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </main>
    </Layout>
  );
}
