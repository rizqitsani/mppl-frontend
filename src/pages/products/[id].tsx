import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { Tab } from '@headlessui/react';

import {
  HiOutlineCurrencyDollar,
  HiOutlineGlobe,
  HiOutlineHeart,
} from 'react-icons/hi';
import clsx from 'clsx';

import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';

import Button from '@/components/Button';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';

import { formatRupiah } from '@/lib/helper';
import axiosClient, { baseUrl } from '@/lib/axios';
import { defaultToastMessage } from '@/lib/constant';
import { ProductDetailApi } from '@/types/api';

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
  const router = useRouter();
  const { query } = router;
  const productId = query.id;

  const isAuthenticated = useAuthStore.useIsAuthenticated();
  const cartItems = useCartStore.useItems();
  const addToCart = useCartStore.useAdd();

  const { data: queryData, error } = useQuery<ProductDetailApi, Error>(
    `/products/${productId}`,
    {
      enabled: !!productId,
    }
  );
  const data = queryData?.data;

  if (error) {
    toast.error('Produk tidak ditemukan!');
    router.push('/products');
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Masuk ke akun Anda untuk menambah item ke keranjang!');
      router.replace('/signin');
      return;
    }

    const isExist = Boolean(
      cartItems.find((item) => item.product.name === data.name)
    );

    if (isExist) {
      toast.error('Barang sudah ada di keranjang!');
    } else {
      toast.promise(
        axiosClient.post('/cart', { product_id: data.id }).then((res) => {
          addToCart({
            ...res.data.data,
            product: { name: data.name, price: data.price },
          });
        }),
        {
          ...defaultToastMessage,
          success: 'Berhasil menambahkan item ke keranjang',
        }
      );
    }
  };

  return (
    <Layout>
      <Seo templateTitle={data?.name} />

      <main className='pt-14 sm:pt-16 layout'>
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          {/* Product */}
          <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
            {/* Image gallery */}
            {data ? (
              <Tab.Group as='div' className='flex flex-col-reverse'>
                {/* Image selector */}
                <div className='hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none'>
                  <Tab.List className='grid grid-cols-4 gap-6'>
                    {data.photos.map((image) => (
                      <Tab
                        key={image.id}
                        className='relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50'
                      >
                        {({ selected }) => (
                          <>
                            <span className='sr-only'>{data.name}</span>
                            <span className='absolute inset-0 overflow-hidden rounded-md'>
                              <NextImage
                                src={`${baseUrl}/static/images/${image.photo_link}`}
                                alt={data.name}
                                className='w-full h-full'
                                imgClassName='object-contain'
                                width='640'
                                height='640'
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
                  {data.photos.map((image) => (
                    <Tab.Panel key={image.id}>
                      <NextImage
                        src={`${baseUrl}/static/images/${image.photo_link}`}
                        alt={data.name}
                        className='w-full h-full'
                        imgClassName='object-contain'
                        width='640'
                        height='640'
                      />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            ) : (
              <div className='bg-gray-400 rounded animate-pulse h-[340px]' />
            )}

            {/* Product info */}
            <div className='px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0'>
              {data ? (
                <>
                  <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                    {data.name}
                  </h1>

                  <div className='mt-3'>
                    <h2 className='sr-only'>Product information</h2>
                    <p className='text-2xl text-gray-900'>
                      {formatRupiah(data.price)}
                    </p>
                  </div>

                  <div className='mt-6'>
                    <h3 className='sr-only'>Description</h3>
                    <p className='text-base text-gray-700'>
                      {data.description}
                    </p>
                  </div>

                  <form className='mt-6'>
                    <div className='flex mt-10 sm:flex-col1'>
                      <Button
                        type='button'
                        variant='primary'
                        onClick={handleAddToCart}
                      >
                        Add to bag
                      </Button>
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
                </>
              ) : (
                <>
                  <div className='bg-gray-400 h-[36px] rounded animate-pulse' />
                  <div className='bg-gray-400 mt-3 h-[24px] rounded animate-pulse' />
                  <div className='bg-gray-400 mt-6 h-[16px] rounded animate-pulse' />
                  <div className='bg-gray-400 mt-2 h-[16px] rounded animate-pulse' />
                  <div className='bg-gray-400 w-2/3 mt-2 h-[16px] rounded animate-pulse' />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
