import * as React from 'react';
import { Column, useSortBy, useTable } from 'react-table';

import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import clsx from 'clsx';

type AdminTableProps<T extends { id: string }> = {
  columns: Column<T>[];
  data: T[];
};

export default function AdminTable<T extends { id: string }>({
  columns,
  data,
}: AdminTableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className='mt-8 overflow-x-auto'>
      <div className='inline-block min-w-full align-middle border-b border-gray-200'>
        <table {...getTableProps()} className='min-w-full'>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={index}
                className='border-t border-gray-200'
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 group'
                  >
                    <div className='flex items-center gap-2'>
                      <p>{column.render('Header')}</p>
                      <span className='flex flex-col items-center justify-center'>
                        <GoTriangleUp
                          className={clsx(
                            'transition-colors',
                            column.isSorted
                              ? column.isSortedDesc
                                ? 'text-transparent'
                                : 'text-gray-700'
                              : 'group-hover:text-gray-400 text-transparent'
                          )}
                        />
                        <GoTriangleDown
                          className={clsx(
                            '-mt-1 transition-colors',
                            column.isSorted
                              ? column.isSortedDesc
                                ? 'text-gray-700'
                                : 'text-transparent'
                              : 'group-hover:text-gray-400 text-transparent'
                          )}
                        />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {data ? (
            <tbody
              {...getTableBodyProps()}
              className='bg-white divide-y divide-gray-100'
            >
              {rows?.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row?.cells?.map((cell, index) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className='px-6 py-3 text-sm text-gray-900 truncate'
                          key={index}
                        >
                          <div className='flex items-center space-x-2'>
                            {cell.render('Cell')}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}
