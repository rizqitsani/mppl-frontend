import * as React from 'react';

import { Dialog } from '@headlessui/react';
import { HiX } from 'react-icons/hi';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

import { Transaction } from '@/types/api';
import { formatDate, formatRupiah } from '@/lib/helper';
import NextImage from '../NextImage';

const paymentMethods = {
  bank_transfer: 'Virtual Account',
  gopay: 'GoPay',
  qris: 'QRIS',
  shopeepay: 'ShopeePay',
};

type OrderDetailProps = {
  data: Transaction;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrderDetail({ data, open, setOpen }: OrderDetailProps) {
  const cancelButtonRef = React.useRef();

  return (
    <Modal open={open} setOpen={setOpen} initialFocus={cancelButtonRef}>
      <div className='flex-1 inline-block p-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:w-full sm:px-8 sm:py-10'>
        <div className='mt-3 sm:mt-0'>
          <div className='flex items-center justify-between pb-4 border-b'>
            <Dialog.Title
              as='h3'
              className='text-xl font-bold leading-6 text-gray-900 '
            >
              Detail Pemesanan
            </Dialog.Title>
            <button
              type='button'
              className='text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400'
              ref={cancelButtonRef}
              onClick={() => setOpen(false)}
            >
              <HiX className='w-6 h-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-4 space-y-4 sm:space-y-6'>
            <div>
              <h4 className='text-sm'>{data.shipment_status}</h4>
              <div className='py-2 mt-2 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-xs font-medium text-gray-500'>
                  No. Invoice
                </dt>
                <dd className='mt-1 text-xs font-semibold text-teal-500 sm:text-right sm:mt-0 sm:col-span-2'>
                  {data.id}
                </dd>
              </div>
              <div className='py-2 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-xs font-medium text-gray-500'>
                  Tanggal Pembelian
                </dt>
                <dd className='mt-1 text-xs text-gray-900 sm:text-right sm:mt-0 sm:col-span-2'>
                  {formatDate(data.transaction_time, 'dd MMMM yyyy HH:mm')}
                </dd>
              </div>
            </div>
            <div>
              <h4 className='text-sm'>Detail Produk</h4>
              <div className='mt-2 space-y-2'>
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex p-2 border border-gray-200 rounded-lg'
                  >
                    <div className='flex-shrink-0'>
                      <div className='overflow-hidden rounded-md w-14 h-14'>
                        <NextImage
                          src={`/images/1.jpg`}
                          alt={item.product.name}
                          className='object-cover object-center w-full h-full'
                          width='640'
                          height='640'
                        />
                      </div>
                    </div>
                    <div className='ml-3'>
                      <h6 className='text-xs font-semibold'>
                        {item.product.name}
                      </h6>
                      <p className='text-xs text-gray-500'>
                        {item.quantity} x {formatRupiah(item.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className='text-sm'>Rincian Pembayaran</h4>
              <div className='py-2 mt-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-xs font-medium text-gray-500'>
                  Metode Pembayaran
                </dt>
                <dd className='mt-1 text-xs font-semibold text-teal-500 sm:text-right sm:mt-0 sm:col-span-2'>
                  {paymentMethods[data.payment_type]}
                </dd>
              </div>
              <div className='py-2 border-t border-gray-200 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-xs font-medium text-gray-500'>
                  Total Harga
                </dt>
                <dd className='mt-1 text-xs text-gray-900 sm:text-right sm:mt-0 sm:col-span-2'>
                  {formatRupiah(data.total)}
                </dd>
              </div>
              <div className='py-2 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-xs font-medium text-gray-500'>
                  Total Ongkos Kirim
                </dt>
                <dd className='mt-1 text-xs text-gray-900 sm:text-right sm:mt-0 sm:col-span-2'>
                  {formatRupiah(data.shipping_cost)}
                </dd>
              </div>
              <div className='py-2 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-xs font-medium text-gray-500'>
                  Biaya Asuransi
                </dt>
                <dd className='mt-1 text-xs text-gray-900 sm:text-right sm:mt-0 sm:col-span-2'>
                  {formatRupiah(data.insurance_cost)}
                </dd>
              </div>
              <div className='py-2 border-t border-gray-200 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-bold text-gray-900'>Total Bayar</dt>
                <dd className='mt-1 text-sm font-bold text-gray-900 sm:text-right sm:mt-0 sm:col-span-2'>
                  {formatRupiah(
                    data.total + data.shipping_cost + data.insurance_cost
                  )}
                </dd>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5 space-y-2 sm:space-x-2 sm:mt-10 sm:flex sm:space-y-0'>
          <Button
            variant='light'
            type='button'
            onClick={() => setOpen(false)}
            className='w-full sm:w-auto'
          >
            Kembali
          </Button>
        </div>
      </div>
    </Modal>
  );
}
