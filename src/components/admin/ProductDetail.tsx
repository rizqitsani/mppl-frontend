import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { Dialog } from '@headlessui/react';
import { HiOutlineTrash, HiX } from 'react-icons/hi';
import clsx from 'clsx';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/SelectInput';

import axiosClient from '@/lib/axios';
import { defaultToastMessage } from '@/lib/constant';
import { Product } from '@/types/api';
import { ProductData } from '@/types/form';

type ProductDetailProps = {
  data: Product;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductDetail({
  data,
  open,
  setOpen,
}: ProductDetailProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const cancelButtonRef = React.useRef();

  const queryClient = useQueryClient();

  const methods = useForm<ProductData>({
    defaultValues: {
      name: data.name,
      price: data.price.toString(),
      stock: data.stock,
      status: data.available ? 'active' : 'non',
    },
  });

  const { handleSubmit } = methods;

  const handleDeleteProduct = () => {
    toast.promise(
      axiosClient
        .delete(`/products/${data.id}`)
        .then(() => {
          queryClient.refetchQueries(['get-products']);
        })
        .finally(() => {
          setIsEditing(false);
          setOpen(false);
        }),
      {
        ...defaultToastMessage,
        success: 'Berhasil menghapus produk!',
      }
    );
  };

  const handleEditProduct = (formData: ProductData) => {
    const newBody = {
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      available: formData.status == 'active',
    };

    toast.promise(
      axiosClient
        .put(`/products/${data.id}`, newBody)
        .then(() => {
          queryClient.refetchQueries(['get-products']);
        })
        .finally(() => {
          setIsEditing(false);
          setOpen(false);
        }),
      {
        ...defaultToastMessage,
        success: 'Berhasil mengubah produk!',
      }
    );
  };

  return (
    <Modal open={open} setOpen={setOpen} initialFocus={cancelButtonRef}>
      <div className='flex-1 inline-block p-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:w-full sm:px-8 sm:py-10'>
        <div className='mt-3 sm:mt-0'>
          <div className='flex items-center justify-between pb-4 border-b'>
            <Dialog.Title
              as='h3'
              className='text-xl font-bold leading-6 text-gray-900 '
            >
              Detail Produk
            </Dialog.Title>
            <div className='space-x-2'>
              <button
                type='button'
                className='text-red-400 bg-white rounded-md hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400'
                ref={cancelButtonRef}
                onClick={handleDeleteProduct}
              >
                <HiOutlineTrash className='w-6 h-6' aria-hidden='true' />
              </button>
              <button
                type='button'
                className='text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400'
                ref={cancelButtonRef}
                onClick={() => setOpen(false)}
              >
                <HiX className='w-6 h-6' aria-hidden='true' />
              </button>
            </div>
          </div>
          <div className='mt-4'>
            {isEditing ? (
              <FormProvider {...methods}>
                <form
                  className='space-y-4'
                  onSubmit={handleSubmit(handleEditProduct)}
                >
                  <Input
                    label='Nama Produk'
                    id='name'
                    validation={{
                      required: 'Nama Produk tidak boleh kosong',
                    }}
                  />

                  <Input
                    label='Harga'
                    id='price'
                    type='number'
                    validation={{
                      required: 'Harga tidak boleh kosong',
                      min: {
                        value: 1,
                        message: 'Harga tidak boleh dibawah 1 rupiah',
                      },
                    }}
                  />

                  <Input
                    label='Stok'
                    id='stock'
                    type='number'
                    validation={{
                      required: 'Stok tidak boleh kosong',
                      min: {
                        value: 0,
                        message: 'Stok tidak boleh dibawah 0',
                      },
                    }}
                  />

                  <Select
                    label='Status Produk'
                    id='status'
                    placeholder='Pilih status produk'
                    helperText='Jika produk aktif, pembeli dapat mencari produk kamu.'
                    validation={{
                      required: 'Status Produk tidak boleh kosong',
                    }}
                  >
                    <option value='active'>Aktif</option>
                    <option value='non'>Nonaktif</option>
                  </Select>
                </form>
              </FormProvider>
            ) : (
              data && (
                <dl className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2'>
                  <div className='sm:col-span-2'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Nama Produk
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>{data.name}</dd>
                  </div>
                  <div className='sm:col-span-2'>
                    <dt className='text-sm font-medium text-gray-900'>Harga</dt>
                    <dd className='mt-1 text-sm text-gray-900'>{data.price}</dd>
                  </div>
                  <div className='sm:col-span-2'>
                    <dt className='text-sm font-medium text-gray-900'>Stok</dt>
                    <dd className='mt-1 text-sm text-gray-900'>{data.stock}</dd>
                  </div>
                  <div className='sm:col-span-2'>
                    <dt className='text-sm font-medium text-gray-900'>
                      Status
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900'>
                      <span
                        className={clsx(
                          'inline-flex px-2 rounded-full',
                          'text-xs font-semibold leading-5',
                          data.available
                            ? 'text-green-800 bg-green-100'
                            : 'text-red-800 bg-red-100'
                        )}
                      >
                        {data.available ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </dd>
                  </div>
                </dl>
              )
            )}
          </div>
        </div>
        <div className='mt-5 space-y-2 sm:space-x-2 sm:mt-10 sm:flex sm:space-y-0'>
          {isEditing ? (
            <>
              <Button
                variant='primary'
                type='submit'
                onClick={handleSubmit(handleEditProduct)}
                className='w-full sm:w-auto'
              >
                Simpan
              </Button>
              <Button
                variant='light'
                type='button'
                onClick={() => setIsEditing(false)}
                className='w-full sm:w-auto'
              >
                Batal
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='primary'
                onClick={() => setIsEditing(true)}
                className='w-full sm:w-auto'
              >
                Edit
              </Button>
              <Button
                variant='light'
                type='button'
                onClick={() => setOpen(false)}
                className='w-full sm:w-auto'
              >
                Kembali
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
