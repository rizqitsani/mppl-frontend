import clsx from 'clsx';

import UnstyledLink from '@/components/links/UnstyledLink';

export default function ButtonLink({
  children,
  className = '',
  variant = 'dark',
  isFullWidth,
  ...rest
}) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'py-2 px-4 flex items-center justify-center rounded font-medium text-sm hover:text-teal-400 animated-underline',
        'border border-gray-600 shadow-sm',
        'focus:outline-none focus-visible:text-teal-400',
        {
          'bg-dark text-white': variant === 'dark',
          'bg-white text-dark hover:bg-gray-100 hover:text-dark focus-visible:text-dark border-gray-400':
            variant === 'light',
          'bg-teal-400 text-black hover:bg-teal-400/90 hover:text-black border-teal-500 focus-visible:text-dark':
            variant === 'primary',
        },
        isFullWidth && 'w-full',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
}
