import * as React from 'react';
import { useQuery } from 'react-query';
import { CellProps, Column } from 'react-table';
import clsx from 'clsx';

import Seo from '@/components/Seo';
import AdminTable from '@/components/admin/AdminTable';
import AdminLayout from '@/components/layout/AdminLayout';

import useRQWithToast from '@/hooks/useRQWithToast';
import axiosClient from '@/lib/axios';
import { Product, ProductApi } from '@/types/api';
import Button from '@/components/Button';
import CreateProductForm from '@/components/admin/CreateProductForm';
import ProductDetail from '@/components/admin/ProductDetail';

const queryFn = async () => {
  const { data } = await axiosClient.get<ProductApi>('/products');
  return data;
};

export default function AdminProductPage() {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState<Product>(null);

  const { data: queryData } = useRQWithToast(
    useQuery<ProductApi, Error>('get-products', queryFn)
  );
  const data = queryData?.data ?? [];

  const columns = React.useMemo<Column<Product>[]>(
    () => [
      {
        Header: 'Nama',
        accessor: 'name',
      },
      {
        Header: 'Stok',
        accessor: 'stock',
      },
      {
        Header: 'Status',
        accessor: 'available',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }: CellProps<Product>) => (
          <span
            className={clsx(
              'inline-flex px-2 rounded-full',
              'text-xs font-semibold leading-5',
              value ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
            )}
          >
            {value ? 'Aktif' : 'Nonaktif'}
          </span>
        ),
      },
      {
        Header: 'Aksi',
        id: 'action',
        // eslint-disable-next-line react/display-name
        Cell: (d: CellProps<Product>) => {
          return (
            <button
              type='button'
              className='text-gray-700 rounded-md shadow-sm focus:outline-none sm:w-auto sm:text-sm'
              onClick={() => {
                setShowDetailModal(true);
                setCurrentProduct(d.row.original);
              }}
            >
              Lihat Detail
            </button>
          );
        },
      },
    ],
    []
  );

  return (
    <AdminLayout>
      <Seo templateTitle='Kelola Produk' />

      <CreateProductForm open={showCreateModal} setOpen={setShowCreateModal} />
      {currentProduct && (
        <ProductDetail
          data={currentProduct}
          open={showDetailModal}
          setOpen={setShowDetailModal}
        />
      )}

      <main>
        {/* Page title & actions */}
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200 sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-bold leading-6 text-gray-900 sm:truncate'>
              Produk
            </h1>
          </div>
          <Button variant='primary' onClick={() => setShowCreateModal(true)}>
            Tambah Produk
          </Button>
        </div>

        <AdminTable columns={columns} data={data} />
      </main>
    </AdminLayout>
  );
}
