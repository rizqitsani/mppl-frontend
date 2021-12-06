import * as React from 'react';

import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { HiChevronDown, HiOutlineX, HiPlusSm } from 'react-icons/hi';
import clsx from 'clsx';

import { PriceFilter } from '@/pages/products';
import Button from '@/components/Button';

const filters = [
  {
    id: 'price',
    name: 'Harga',
    options: [
      { value: '0', label: 'Rp100 rb - Rp250 rb', min: 100000, max: 250000 },
      { value: '1', label: 'Rp250 rb - Rp500 jt', min: 250001, max: 500000 },
      { value: '2', label: 'Rp500 jt - Rp1 jt', min: 500001, max: 1000000 },
    ],
  },
];

type FilterMenuProps = {
  open: boolean;
  priceFilter: PriceFilter;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceFilter: React.Dispatch<React.SetStateAction<PriceFilter>>;
};

const MobileFilterMenu = ({
  open,
  priceFilter,
  setOpen,
  setPriceFilter,
}: FilterMenuProps) => (
  <Transition.Root show={open} as={React.Fragment}>
    <Dialog
      as='div'
      className='fixed inset-0 z-40 flex lg:hidden'
      onClose={setOpen}
    >
      <Transition.Child
        as={React.Fragment}
        enter='transition-opacity ease-linear duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity ease-linear duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
      </Transition.Child>

      <Transition.Child
        as={React.Fragment}
        enter='transition ease-in-out duration-300 transform'
        enterFrom='translate-x-full'
        enterTo='translate-x-0'
        leave='transition ease-in-out duration-300 transform'
        leaveFrom='translate-x-0'
        leaveTo='translate-x-full'
      >
        <div className='relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl'>
          <div className='flex items-center justify-between px-4'>
            <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
            <button
              type='button'
              className='flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 hover:text-gray-500'
              onClick={() => setOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <HiOutlineX className='w-6 h-6' aria-hidden='true' />
            </button>
          </div>

          {/* Filters */}
          <form className='mt-4'>
            {filters.map((section) => (
              <Disclosure
                as='div'
                key={section.name}
                className='pt-4 pb-4 border-t border-gray-200'
              >
                {({ open }) => (
                  <fieldset>
                    <legend className='w-full px-2'>
                      <Disclosure.Button className='flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500'>
                        <span className='text-sm font-medium text-gray-900'>
                          {section.name}
                        </span>
                        <span className='flex items-center ml-6 h-7'>
                          <HiChevronDown
                            className={clsx(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-5 w-5 transform'
                            )}
                            aria-hidden='true'
                          />
                        </span>
                      </Disclosure.Button>
                    </legend>
                    <Disclosure.Panel className='px-4 pt-4 pb-2'>
                      <div className='space-y-6'>
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className='flex items-center'>
                            <input
                              id={`${section.id}-${optionIdx}-mobile`}
                              name={`${section.id}[]`}
                              value={option.value}
                              type='radio'
                              onChange={() =>
                                setPriceFilter((status) => ({
                                  ...status,
                                  min: option.min,
                                  max: option.max,
                                }))
                              }
                              checked={priceFilter?.min === option.min}
                              className='w-4 h-4 text-teal-600 border-gray-300 rounded-full focus:ring-teal-500'
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}-mobile`}
                              className='ml-3 text-sm text-gray-500'
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </fieldset>
                )}
              </Disclosure>
            ))}
          </form>
          <Button
            type='button'
            variant='outline'
            onClick={() => setPriceFilter(null)}
            className='justify-center mx-4'
          >
            Hapus Filter
          </Button>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition.Root>
);

const DesktopFilterMenu = ({
  priceFilter,
  setOpen,
  setPriceFilter,
}: FilterMenuProps) => (
  <aside>
    <h2 className='sr-only'>Filter</h2>

    <button
      type='button'
      className='inline-flex items-center lg:hidden'
      onClick={() => setOpen(true)}
    >
      <span className='text-sm font-medium text-gray-700'>Filter</span>
      <HiPlusSm
        className='flex-shrink-0 w-5 h-5 ml-1 text-gray-400'
        aria-hidden='true'
      />
    </button>

    <div className='hidden lg:block'>
      <form className='space-y-10'>
        {filters.map((section, sectionIdx) => (
          <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
            <fieldset>
              <legend className='block text-sm font-medium text-gray-900'>
                {section.name}
              </legend>
              <div className='pt-6 space-y-3'>
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className='flex items-center'>
                    <input
                      id={`${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      value={option.value}
                      type='radio'
                      onChange={() =>
                        setPriceFilter((status) => ({
                          ...status,
                          min: option.min,
                          max: option.max,
                        }))
                      }
                      checked={priceFilter?.min === option.min}
                      className='w-4 h-4 text-teal-600 border-gray-300 rounded-full focus:ring-teal-500'
                    />
                    <label
                      htmlFor={`${section.id}-${optionIdx}`}
                      className='ml-3 text-sm text-gray-600'
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
        <Button
          type='button'
          variant='outline'
          onClick={() => setPriceFilter(null)}
        >
          Hapus Filter
        </Button>
      </form>
    </div>
  </aside>
);

const FilterMenu = {
  Desktop: DesktopFilterMenu,
  Mobile: MobileFilterMenu,
};

export default FilterMenu;
