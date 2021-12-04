import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

import { HiX } from 'react-icons/hi';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';

import axiosClient from '@/lib/axios';
import { defaultToastMessage } from '@/lib/constant';
import { ProductData } from '@/types/form';

type CreateProductFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateProductForm({
  open,
  setOpen,
}: CreateProductFormProps) {
  const cancelButtonRef = React.useRef();

  const queryClient = useQueryClient();

  const methods = useForm<ProductData>();
  const { handleSubmit, reset } = methods;

  const handleCreateProduct = (data: ProductData) => {
    const formData = new FormData();

    const newBody = {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      available: data.status == 'active',
    };

    for (const key in newBody) {
      formData.append(key, newBody[key]);
    }

    data.image.map((image) => formData.append('image', image));

    toast.promise(
      axiosClient
        .post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          queryClient.refetchQueries(['get-products']);
        })
        .finally(() => {
          setOpen(false);
          reset();
        }),
      {
        ...defaultToastMessage,
        success: 'Berhasil menambahkan produk!',
      }
    );
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className='flex-1 inline-block p-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:w-full sm:px-8 sm:py-10'>
        <div className='mt-3 sm:mt-0'>
          <div className='flex items-center justify-between pb-4 border-b'>
            <Dialog.Title
              as='h3'
              className='text-xl font-bold leading-6 text-gray-900 '
            >
              Tambah Produk
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
          <div className='mt-4'>
            <FormProvider {...methods}>
              <form className='space-y-4'>
                <Input
                  label='Nama Produk'
                  id='name'
                  validation={{
                    required: 'Nama Produk tidak boleh kosong',
                  }}
                />

                <TextArea
                  label='Deskripsi'
                  id='description'
                  validation={{
                    required: 'Deskripsi tidak boleh kosong',
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

                <DropzoneInput
                  label='Foto Produk'
                  id='image'
                  accept='image/png, image/jpg, image/jpeg'
                  maxFiles={4}
                  helperText='File yang dapat diupload berupa .png, .jpg, atau .jpeg'
                  validation={{
                    required: 'Foto Produk tidak boleh kosong',
                  }}
                />

                <Select
                  label='Status Produk'
                  id='status'
                  placeholder='Pilih status produk'
                  helperText='Jika produk aktif, pembeli dapat mencari produk kamu!'
                  validation={{
                    required: 'Status Produk tidak boleh kosong',
                  }}
                >
                  <option value='active'>Aktif</option>
                  <option value='non'>Nonaktif</option>
                </Select>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className='mt-5 space-y-2 sm:mt-4 sm:flex sm:space-x-2 sm:space-y-0'>
          <Button
            variant='primary'
            type='submit'
            className='w-full sm:w-auto'
            onClick={handleSubmit(handleCreateProduct)}
          >
            Tambah
          </Button>
          <Button
            variant='light'
            type='button'
            className='w-full sm:w-auto'
            onClick={() => setOpen(false)}
            ref={cancelButtonRef}
          >
            Kembali
          </Button>
        </div>
      </div>
    </Modal>
  );
}
