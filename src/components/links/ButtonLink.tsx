import clsx from 'clsx';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

enum ButtonVariant {
  'dark',
  'light',
  'primary',
}

type ButtonLinkProps = {
  isFullWidth?: boolean;
  variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

export default function ButtonLink({
  children,
  className = '',
  variant = 'dark',
  isFullWidth,
  ...rest
}: ButtonLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'py-2 px-4 rounded text-sm hover:text-teal-400 font-medium',
        'border shadow-sm',
        'focus:outline-none focus-visible:text-teal-400',
        variant === 'primary'
          ? 'bg-teal-400 text-white hover:bg-teal-400/90 hover:text-white border-teal-500 disabled:hover:bg-teal-400 disabled:brightness-75  focus-visible:text-dark'
          : variant === 'light'
          ? 'bg-white disabled:bg-gray-200 text-dark hover:bg-gray-200 hover:text-dark focus-visible:text-dark border-gray-400 disabled:hover:text-dark'
          : variant === 'dark'
          ? 'bg-dark disabled:bg-gray-700 text-white disabled:hover:text-white'
          : 'border-gray-600',
        isFullWidth && 'flex justify-center w-full',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
}
