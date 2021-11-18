import { Fragment } from 'react';

import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import clsx from 'clsx';
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineX,
} from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

const MobileNav = ({ open, setOpen }) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog
      as='div'
      className='fixed inset-0 z-40 flex lg:hidden'
      onClose={setOpen}
    >
      <Transition.Child
        as={Fragment}
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
        as={Fragment}
        enter='transition ease-in-out duration-300 transform'
        enterFrom='-translate-x-full'
        enterTo='translate-x-0'
        leave='transition ease-in-out duration-300 transform'
        leaveFrom='translate-x-0'
        leaveTo='-translate-x-full'
      >
        <div className='relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl'>
          <div className='flex px-4 pt-5 pb-2'>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md'
              onClick={() => setOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <HiOutlineX className='w-6 h-6' aria-hidden='true' />
            </button>
          </div>

          {/* Links */}
          <Tab.Group as='div' className='mt-2'>
            <div className='border-b border-gray-200'>
              <Tab.List className='flex px-4 -mb-px space-x-8'>
                {navigation.categories.map((category) => (
                  <Tab
                    key={category.name}
                    className={({ selected }) =>
                      clsx(
                        selected
                          ? 'text-teal-600 border-teal-600'
                          : 'text-gray-900 border-transparent',
                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                      )
                    }
                  >
                    {category.name}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              {navigation.categories.map((category) => (
                <Tab.Panel
                  key={category.name}
                  className='px-4 pt-10 pb-8 space-y-10'
                >
                  <div className='grid grid-cols-2 gap-x-4'>
                    {category.featured.map((item) => (
                      <div key={item.name} className='relative text-sm group'>
                        <div className='overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                          <img
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            className='object-cover object-center'
                          />
                        </div>
                        <a
                          href={item.href}
                          className='block mt-6 font-medium text-gray-900'
                        >
                          <span
                            className='absolute inset-0 z-10'
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                        <p aria-hidden='true' className='mt-1'>
                          Shop now
                        </p>
                      </div>
                    ))}
                  </div>
                  {category.sections.map((section) => (
                    <div key={section.name}>
                      <p
                        id={`${category.id}-${section.id}-heading-mobile`}
                        className='font-medium text-gray-900'
                      >
                        {section.name}
                      </p>
                      <ul
                        role='list'
                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                        className='flex flex-col mt-6 space-y-6'
                      >
                        {section.items.map((item) => (
                          <li key={item.name} className='flow-root'>
                            <a
                              href={item.href}
                              className='block p-2 -m-2 text-gray-500'
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
            {navigation.pages.map((page) => (
              <div key={page.name} className='flow-root'>
                <a
                  href={page.href}
                  className='block p-2 -m-2 font-medium text-gray-900'
                >
                  {page.name}
                </a>
              </div>
            ))}
          </div>

          <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
            <div className='flow-root'>
              <a href='#' className='block p-2 -m-2 font-medium text-gray-900'>
                Sign in
              </a>
            </div>
            <div className='flow-root'>
              <a href='#' className='block p-2 -m-2 font-medium text-gray-900'>
                Create account
              </a>
            </div>
          </div>

          <div className='px-4 py-6 border-t border-gray-200'>
            <a href='#' className='flex items-center p-2 -m-2'>
              <img
                src='https://tailwindui.com/img/flags/flag-canada.svg'
                alt=''
                className='flex-shrink-0 block w-5 h-auto'
              />
              <span className='block ml-3 text-base font-medium text-gray-900'>
                CAD
              </span>
              <span className='sr-only'>, change currency</span>
            </a>
          </div>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition.Root>
);

const DesktopNav = ({ setOpen }) => (
  <nav
    aria-label='Top'
    className='relative z-20 flex items-center justify-between min-h-[3.5rem] lg:min-h-[4.5rem] bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  >
    <div className='flex items-center'>
      <button
        type='button'
        className='p-2 text-gray-400 bg-white rounded-md lg:hidden'
        onClick={() => setOpen(true)}
      >
        <span className='sr-only'>Open menu</span>
        <HiOutlineMenu className='w-6 h-6' aria-hidden='true' />
      </button>

      {/* Logo */}
      <div className='flex ml-4 lg:ml-0'>
        <UnstyledLink href='/'>
          <span className='sr-only'>Silvery</span>
          <img className='w-auto h-12' src='/logo.svg' alt='' />
        </UnstyledLink>
      </div>

      {/* Flyout menus */}
      <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
        <div className='flex h-full space-x-8'>
          {navigation.categories.map((category) => (
            <Popover key={category.name} className='flex'>
              {({ open }) => (
                <>
                  <div className='relative flex'>
                    <Popover.Button
                      className={clsx(
                        open
                          ? 'border-teal-600 text-teal-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                      )}
                    >
                      {category.name}
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Popover.Panel className='absolute inset-x-0 text-sm text-gray-500 bg-white top-full'>
                      {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                      <div
                        className='absolute inset-0 bg-white shadow top-1/2'
                        aria-hidden='true'
                      />
                      {/* Fake border when menu is open */}
                      <div
                        className='absolute inset-0 top-0 h-px px-8 mx-auto max-w-7xl'
                        aria-hidden='true'
                      >
                        <div
                          className={clsx(
                            open ? 'bg-gray-200' : 'bg-transparent',
                            'w-full h-px transition-colors ease-out duration-200'
                          )}
                        />
                      </div>

                      <div className='relative'>
                        <div className='px-8 mx-auto max-w-7xl'>
                          <div className='grid grid-cols-2 py-16 gap-y-10 gap-x-8'>
                            <div className='grid grid-cols-2 col-start-2 gap-x-8'>
                              {category.featured.map((item) => (
                                <div
                                  key={item.name}
                                  className='relative text-base group sm:text-sm'
                                >
                                  <div className='overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                                    <img
                                      src={item.imageSrc}
                                      alt={item.imageAlt}
                                      className='object-cover object-center'
                                    />
                                  </div>
                                  <a
                                    href={item.href}
                                    className='block mt-6 font-medium text-gray-900'
                                  >
                                    <span
                                      className='absolute inset-0 z-10'
                                      aria-hidden='true'
                                    />
                                    {item.name}
                                  </a>
                                  <p aria-hidden='true' className='mt-1'>
                                    Shop now
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className='grid grid-cols-3 row-start-1 text-sm gap-y-10 gap-x-8'>
                              {category.sections.map((section) => (
                                <div key={section.name}>
                                  <p
                                    id={`${section.name}-heading`}
                                    className='font-medium text-gray-900'
                                  >
                                    {section.name}
                                  </p>
                                  <ul
                                    role='list'
                                    aria-labelledby={`${section.name}-heading`}
                                    className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                  >
                                    {section.items.map((item) => (
                                      <li key={item.name} className='flex'>
                                        <a
                                          href={item.href}
                                          className='hover:text-gray-800'
                                        >
                                          {item.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ))}

          {navigation.pages.map((page) => (
            <a
              key={page.name}
              href={page.href}
              className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
            >
              {page.name}
            </a>
          ))}
        </div>
      </Popover.Group>
    </div>

    <div className='flex items-center'>
      <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
        <a
          href='#'
          className='text-sm font-medium text-gray-700 hover:text-gray-800'
        >
          Sign in
        </a>
        <span className='w-px h-6 bg-gray-200' aria-hidden='true' />
        <a
          href='#'
          className='text-sm font-medium text-gray-700 hover:text-gray-800'
        >
          Create account
        </a>
      </div>

      {/* Search */}
      <div className='flex lg:ml-6'>
        <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>Search</span>
          <HiOutlineSearch className='w-6 h-6' aria-hidden='true' />
        </a>
      </div>

      {/* Cart */}
      <div className='flow-root ml-4 lg:ml-6'>
        <a href='#' className='flex items-center p-2 -m-2 group'>
          <HiOutlineShoppingBag
            className='flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500'
            aria-hidden='true'
          />
          <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
            0
          </span>
          <span className='sr-only'>items in cart, view bag</span>
        </a>
      </div>
    </div>
  </nav>
);

const Nav = {
  Desktop: DesktopNav,
  Mobile: MobileNav,
};

export default Nav;
