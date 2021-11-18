import { useFormContext } from 'react-hook-form';

import { HiExclamationCircle } from 'react-icons/hi';
import clsx from 'clsx';

export default function Input({
  label,
  placeholder = '',
  id,
  type = 'text',
  disabled = false,
  validation,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className=''>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          {...register(id, validation)}
          type={type}
          name={id}
          id={id}
          disabled={disabled}
          className={clsx(
            'block w-full border-gray-300  rounded-md shadow-sm sm:text-sm',
            errors[id]
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-teal-400 focus:border-teal-400'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
        {errors[id] && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      {errors[id] && (
        <span className='text-xs text-red-500'>{errors[id].message}</span>
      )}
    </div>
  );
}
