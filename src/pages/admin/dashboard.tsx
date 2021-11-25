import * as React from 'react';

import { Menu, Transition } from '@headlessui/react';
import {
  HiChevronRight,
  HiDotsVertical,
  HiDuplicate,
  HiPencilAlt,
  HiTrash,
  HiUserAdd,
} from 'react-icons/hi';
import clsx from 'clsx';

import Seo from '@/components/Seo';
import AdminLayout from '@/components/layout/AdminLayout';

const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-blue-600',
  },
];
const pinnedProjects = projects.filter((project) => project.pinned);

export default function DashboardAdminPage() {
  return (
    <>
      <Seo templateTitle='Dashboard Admin' />

      <AdminLayout>
        {/* Page title & actions */}
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200 sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-bold leading-6 text-gray-900 sm:truncate'>
              Home
            </h1>
          </div>
        </div>

        {/* Pinned projects */}
        <div className='px-4 mt-6 sm:px-6 lg:px-8'>
          <h2 className='text-xs font-medium tracking-wide text-gray-500 uppercase'>
            Pinned Projects
          </h2>
          <ul
            role='list'
            className='grid grid-cols-1 gap-4 mt-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4'
          >
            {pinnedProjects.map((project) => (
              <li
                key={project.id}
                className='relative flex col-span-1 rounded-md shadow-sm'
              >
                <div
                  className={clsx(
                    project.bgColorClass,
                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                  )}
                >
                  {project.initials}
                </div>
                <div className='flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md'>
                  <div className='flex-1 px-4 py-2 text-sm truncate'>
                    <a
                      href='#'
                      className='font-medium text-gray-900 hover:text-gray-600'
                    >
                      {project.title}
                    </a>
                    <p className='text-gray-500'>
                      {project.totalMembers} Members
                    </p>
                  </div>
                  <Menu as='div' className='flex-shrink-0 pr-2'>
                    <Menu.Button className='inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'>
                      <span className='sr-only'>Open options</span>
                      <HiDotsVertical className='w-5 h-5' aria-hidden='true' />
                    </Menu.Button>
                    <Transition
                      as={React.Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute z-10 w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg right-10 top-3 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={clsx(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                View
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={clsx(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Removed from pinned
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={clsx(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Share
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects list (only on smallest breakpoint) */}
        <div className='mt-10 sm:hidden'>
          <div className='px-4 sm:px-6'>
            <h2 className='text-xs font-medium tracking-wide text-gray-500 uppercase'>
              Projects
            </h2>
          </div>
          <ul
            role='list'
            className='mt-3 border-t border-gray-200 divide-y divide-gray-100'
          >
            {projects.map((project) => (
              <li key={project.id}>
                <a
                  href='#'
                  className='flex items-center justify-between px-4 py-4 group hover:bg-gray-50 sm:px-6'
                >
                  <span className='flex items-center space-x-3 truncate'>
                    <span
                      className={clsx(
                        project.bgColorClass,
                        'w-2.5 h-2.5 flex-shrink-0 rounded-full'
                      )}
                      aria-hidden='true'
                    />
                    <span className='text-sm font-medium leading-6 truncate'>
                      {project.title}{' '}
                      <span className='font-normal text-gray-500 truncate'>
                        in {project.team}
                      </span>
                    </span>
                  </span>
                  <HiChevronRight
                    className='w-5 h-5 ml-4 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects table (small breakpoint and up) */}
        <div className='hidden mt-8 sm:block'>
          <div className='inline-block min-w-full align-middle border-b border-gray-200'>
            <table className='min-w-full'>
              <thead>
                <tr className='border-t border-gray-200'>
                  <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                    <span className='lg:pl-2'>Project</span>
                  </th>
                  <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                    Members
                  </th>
                  <th className='hidden px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 md:table-cell bg-gray-50'>
                    Last updated
                  </th>
                  <th className='py-3 pr-6 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50' />
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-100'>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className='w-full px-6 py-3 text-sm font-medium text-gray-900 max-w-0 whitespace-nowrap'>
                      <div className='flex items-center space-x-3 lg:pl-2'>
                        <div
                          className={clsx(
                            project.bgColorClass,
                            'flex-shrink-0 w-2.5 h-2.5 rounded-full'
                          )}
                          aria-hidden='true'
                        />
                        <a href='#' className='truncate hover:text-gray-600'>
                          <span>
                            {project.title}{' '}
                            <span className='font-normal text-gray-500'>
                              in {project.team}
                            </span>
                          </span>
                        </a>
                      </div>
                    </td>
                    <td className='px-6 py-3 text-sm font-medium text-gray-500'>
                      <div className='flex items-center space-x-2'>
                        <div className='flex flex-shrink-0 -space-x-1'>
                          {project.members.map((member) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={member.handle}
                              className='w-6 h-6 rounded-full max-w-none ring-2 ring-white'
                              src={member.imageUrl}
                              alt={member.name}
                            />
                          ))}
                        </div>
                        {project.totalMembers > project.members.length ? (
                          <span className='flex-shrink-0 text-xs font-medium leading-5'>
                            +{project.totalMembers - project.members.length}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className='hidden px-6 py-3 text-sm text-right text-gray-500 md:table-cell whitespace-nowrap'>
                      {project.lastUpdated}
                    </td>
                    <td className='pr-6'>
                      <Menu
                        as='div'
                        className='relative flex items-center justify-end'
                      >
                        <Menu.Button className='inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'>
                          <span className='sr-only'>Open options</span>
                          <HiDotsVertical
                            className='w-5 h-5'
                            aria-hidden='true'
                          />
                        </Menu.Button>
                        <Transition
                          as={React.Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute top-0 z-10 w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg right-7 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='py-1'>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href='#'
                                    className={clsx(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm'
                                    )}
                                  >
                                    <HiPencilAlt
                                      className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                                      aria-hidden='true'
                                    />
                                    Edit
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href='#'
                                    className={clsx(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm'
                                    )}
                                  >
                                    <HiDuplicate
                                      className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                                      aria-hidden='true'
                                    />
                                    Duplicate
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href='#'
                                    className={clsx(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm'
                                    )}
                                  >
                                    <HiUserAdd
                                      className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                                      aria-hidden='true'
                                    />
                                    Share
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className='py-1'>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href='#'
                                    className={clsx(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm'
                                    )}
                                  >
                                    <HiTrash
                                      className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                                      aria-hidden='true'
                                    />
                                    Delete
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
