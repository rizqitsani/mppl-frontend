import * as React from 'react';
import { useQuery } from 'react-query';
import { CellProps, Column } from 'react-table';

import useRQWithToast from '@/hooks/useRQWithToast';

import Seo from '@/components/Seo';
import AdminTable from '@/components/admin/AdminTable';
import AdminLayout from '@/components/layout/AdminLayout';
import OrderDetail from '@/components/admin/OrderDetail';

import { Transaction, TransactionApi } from '@/types/api';
import { formatDate, formatRupiah } from '@/lib/helper';

export default function AdminTransactionPage() {
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [currentTransaction, setCurrentTransaction] =
    React.useState<Transaction>(null);

  const { data: queryData } = useRQWithToast(
    useQuery<TransactionApi, Error>('/transaction/all')
  );
  const data = queryData?.data ?? [];

  const columns = React.useMemo<Column<Transaction>[]>(
    () => [
      {
        Header: 'No',
        accessor: 'id',
      },
      {
        Header: 'Total',
        accessor: (d) => [d.total, d.shipping_cost, d.insurance_cost],
        // eslint-disable-next-line react/display-name
        Cell: ({ value }: CellProps<Transaction>) => {
          const total = value.reduce((prev, curr) => prev + curr, 0);
          return <span>{formatRupiah(total)}</span>;
        },
      },
      {
        Header: 'Status Pembayaran',
        accessor: 'transaction_status',
      },
      {
        Header: 'Status Pengiriman',
        accessor: 'shipment_status',
      },
      {
        Header: 'Tanggal Transaksi',
        accessor: 'settlement_time',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }: CellProps<Transaction>) => (
          <span>{formatDate(value, 'dd MMMM yyyy HH:mm')}</span>
        ),
      },
      {
        Header: 'Aksi',
        id: 'action',
        // eslint-disable-next-line react/display-name
        Cell: (d: CellProps<Transaction>) => {
          return (
            <button
              type='button'
              className='text-gray-700 rounded-md shadow-sm focus:outline-none sm:w-auto sm:text-sm'
              onClick={() => {
                setShowDetailModal(true);
                setCurrentTransaction(d.row.original);
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
      <Seo templateTitle='Daftar Transaksi' />

      {currentTransaction && (
        <OrderDetail
          data={currentTransaction}
          open={showDetailModal}
          setOpen={setShowDetailModal}
        />
      )}

      <main>
        {/* Page title & actions */}
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200 sm:px-6 lg:px-8'>
          <h1 className='text-lg font-bold leading-6 text-gray-900 sm:truncate'>
            Transaksi
          </h1>
        </div>

        <AdminTable columns={columns} data={data} />
      </main>
    </AdminLayout>
  );
}
