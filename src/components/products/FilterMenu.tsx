import * as React from 'react';

import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { HiChevronDown, HiOutlineX, HiPlusSm } from 'react-icons/hi';
import clsx from 'clsx';

const filters = [
  {
    id: 'color',
    name: 'Warna',
    options: [
      { value: 'white', label: 'Putih' },
      { value: 'beige', label: 'Krem' },
      { value: 'blue', label: 'Biru' },
      { value: 'brown', label: 'Cokelat' },
      { value: 'green', label: 'Hijau' },
      { value: 'purple', label: 'Ungu' },
    ],
  },
  {
    id: 'category',
    name: 'Kategori',
    options: [
      { value: 'new-arrivals', label: 'Barang Baru' },
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'sweatshirts', label: 'Sweatshirts' },
      { value: 'pants-shorts', label: 'Pants & Shorts' },
    ],
  },
  {
    id: 'sizes',
    name: 'Ukuran',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
];

type FilterMenuProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileFilterMenu = ({ open, setOpen }: FilterMenuProps) => (
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
                              defaultValue={option.value}
                              type='checkbox'
                              className='w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500'
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
        </div>
      </Transition.Child>
    </Dialog>
  </Transition.Root>
);

const DesktopFilterMenu = ({ setOpen }: FilterMenuProps) => (
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
      <form className='space-y-10 divide-y divide-gray-200'>
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
                      defaultValue={option.value}
                      type='checkbox'
                      className='w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500'
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
      </form>
    </div>
  </aside>
);

const FilterMenu = {
  Desktop: DesktopFilterMenu,
  Mobile: MobileFilterMenu,
};

export default FilterMenu;
