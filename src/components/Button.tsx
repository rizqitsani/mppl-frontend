import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
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
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const disabled = isLoading || buttonDisabled;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        className,
        'inline-flex px-4 py-2 font-semibold rounded',
        'focus:outline-none focus-visible:ring focus-visible:ring-teal-500',
        'shadow-sm',
        'transition-colors duration-75',
        [
          variant === 'primary' && [
            'bg-teal-400 text-white',
            'border border-teal-500',
            'hover:bg-teal-500 hover:text-white',
            'active:bg-teal-600',
            'disabled:bg-teal-600 disabled:hover:bg-teal-600',
          ],
          variant === 'outline' && [
            'text-teal-500',
            'border border-teal-500',
            'hover:bg-teal-50 active:bg-teal-100 disabled:bg-teal-100',
          ],
          variant === 'ghost' && [
            'text-teal-500',
            'shadow-none',
            'hover:bg-teal-50 active:bg-teal-100 disabled:bg-teal-100',
          ],
          variant === 'light' && [
            'bg-white text-dark ',
            'border border-gray-300',
            'hover:text-dark hover:bg-gray-100',
            'active:bg-white/80 disabled:bg-gray-200',
          ],
          variant === 'dark' && [
            'bg-gray-900 text-white',
            'border border-gray-600',
            'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
          ],
        ],
        'disabled:cursor-not-allowed',
        isFullWidth && 'w-full',
        isLoading &&
          'relative !text-transparent hover:!text-transparent !cursor-wait !transition-none'
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
