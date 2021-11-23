import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import TextArea from '@/components/forms/TextArea';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import axiosClient from '@/lib/axios';
import { defaultToastMessage } from '@/lib/constant';
import NextImage from '@/components/NextImage';

export default function SignUpPage() {
  const router = useRouter();

  const methods = useForm();
  const { handleSubmit } = methods;

  const handleLogin = (data) => {
    const newBody = {
      email: data.email,
      password: data.password,
      full_name: data.name,
      telephone: data.phone,
      address: data.address,
    };

    toast.promise(
      axiosClient
        .post('/auth/register', newBody)
        // eslint-disable-next-line no-unused-vars
        .then(() => router.push('/signin')),
      {
        ...defaultToastMessage,
        success: 'Berhasil! Anda bisa masuk ke akun anda',
      }
    );
  };

  return (
    <>
      <Seo templateTitle='Daftar' />

      <div className='mx-auto'>
        <div className='flex flex-col justify-center min-h-screen px-4 py-8 sm:px-10 bg-gray-50 lg:px-8'>
          <div className='flex flex-col items-center sm:max-w-md sm:mx-auto'>
            <UnstyledLink href='/'>
              <span className='sr-only'>Logo Silvery</span>
              <div className='w-12 h-12 sm:w-16 sm:h-16'>
                <NextImage
                  src='/images/logo.png'
                  alt='Logo'
                  height='1200'
                  width='1200'
                  className='w-full h-full'
                />
              </div>
            </UnstyledLink>
            <h1 className='mt-6 text-2xl font-extrabold text-center text-gray-900 sm:text-3xl lg:text-4xl'>
              Masuk ke akun Anda
            </h1>
          </div>

          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
              <FormProvider {...methods}>
                <form
                  className='space-y-4'
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <Input
                    label='Email'
                    id='email'
                    type='email'
                    validation={{
                      required: 'Email tidak boleh kosong',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Email tidak valid',
                      },
                    }}
                  />

                  <PasswordInput
                    label='Password'
                    id='password'
                    validation={{
                      required: 'Password tidak boleh kosong',
                      minLength: {
                        value: 8,
                        message: 'Password harus lebih dari 8 karakter',
                      },
                    }}
                  />

                  <Input
                    label='Nama Lengkap'
                    id='name'
                    type='text'
                    validation={{
                      required: 'Nama lengkap tidak boleh kosong',
                    }}
                  />

                  <Input
                    label='Nomor Whatsapp'
                    id='phone'
                    type='text'
                    placeholder='+6285123456'
                    validation={{
                      required: 'Nomor whatsapp tidak boleh kosong',
                      pattern: {
                        value: /^\+628[1-9][0-9]{7,11}$/,
                        message:
                          'Nomor whatsapp harus diawali +62 dan memiliki panjang 13-15 karakter',
                      },
                    }}
                  />

                  <TextArea
                    label='Alamat'
                    id='address'
                    validation={{
                      required: 'Alamat tidak boleh kosong',
                    }}
                  />

                  <div>
                    <Button variant='primary' isFullWidth>
                      Buat Akun
                    </Button>
                  </div>
                </form>
              </FormProvider>

              <div className='mt-6'>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 text-gray-500 bg-white'>
                      Sudah punya akun?
                    </span>
                  </div>
                </div>

                <div className='mt-6'>
                  <ButtonLink href='/signin' variant='light' isFullWidth>
                    Masuk
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
