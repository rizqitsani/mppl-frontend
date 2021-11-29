import * as React from 'react';
import clsx from 'clsx';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

import { formatRupiah } from '@/lib/helper';
import { Product } from '@/types/api';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <>
      <div
        key={product.id}
        className={clsx(
          className,
          'relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group'
        )}
      >
        <div className='bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75'>
          <NextImage
            src={`/images/product-${Math.floor(Math.random() * 3)}.jpg`}
            alt={product.name}
            className='object-cover object-center w-full h-full sm:w-full sm:h-full'
            width='640'
            height='640'
          />
        </div>
        <div className='flex flex-col flex-1 p-4 space-y-2'>
          <h3 className='text-sm font-medium text-gray-900'>
            <UnstyledLink href={`/products/${product.id}`}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </UnstyledLink>
          </h3>
          <p className='text-sm text-gray-500'>{formatRupiah(product.price)}</p>
        </div>
      </div>
    </>
  );
}
