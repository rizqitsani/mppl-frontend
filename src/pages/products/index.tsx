import * as React from 'react';
import { useQuery } from 'react-query';

import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';
import FilterMenu from '@/components/products/FilterMenu';
import ProductCard from '@/components/products/ProductCard';

import { ProductApi } from '@/types/api';

export default function ProductListPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  const { data: queryData } = useQuery<ProductApi, Error>('/products');
  const data = queryData?.data ?? [];

  return (
    <Layout>
      <Seo templateTitle='Daftar Produk' />

      <div>
        {/* Mobile filter dialog */}
        <FilterMenu.Mobile
          open={mobileFiltersOpen}
          setOpen={setMobileFiltersOpen}
        />

        <main className='layout'>
          <div className='pb-10 border-b border-gray-200 pt-14 sm:pt-16'>
            <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
              Produk Baru
            </h1>
            <p className='mt-4 text-base text-gray-500'>
              Lihat penawaran terbaru dari kami!
            </p>
          </div>

          <div className='pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
            <FilterMenu.Desktop
              open={mobileFiltersOpen}
              setOpen={setMobileFiltersOpen}
            />

            <section
              aria-labelledby='product-heading'
              className='mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3'
            >
              <h2 id='product-heading' className='sr-only'>
                Products
              </h2>

              {data ? (
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
                  {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className='bg-gray-400 animate-pulse h-[340px] rounded'
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}
