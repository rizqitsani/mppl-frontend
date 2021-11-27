import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

enum ButtonVariant {
  'dark',
  'light',
  'primary',
}

type ButtonProps = {
  isFullWidth?: boolean;
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

export default function Button({
  children,
  className,
  disabled: buttonDisabled,
  isFullWidth,
  isLoading,
  variant = 'dark',
  ...rest
}: ButtonProps) {
  const disabled = isLoading || buttonDisabled;

  return (
    <button
      {...rest}
      disabled={disabled}
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
        'disabled:cursor-not-allowed',
        !disabled && 'animated-underline',
        isLoading &&
          'relative text-transparent hover:!text-transparent !cursor-wait transition-none',
        isFullWidth && 'w-full',
        className
      )}
    >
      {isLoading && (
        <div
          className={clsx(
            'absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
            variant !== 'dark' ? 'text-black' : 'text-white'
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      {children}
    </button>
  );
}
