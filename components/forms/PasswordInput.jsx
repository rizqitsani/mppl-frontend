import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { HiEye, HiEyeOff } from 'react-icons/hi';
import clsx from 'clsx';

export default function PasswordInput({
  label,
  placeholder = '',
  id,
  disabled = false,
  validation,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className=''>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1 '>
        <input
          {...register(id, validation)}
          type={showPassword ? 'text' : 'password'}
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
        <button
          type='button'
          onClick={togglePassword}
          className='absolute inset-y-0 right-0 flex items-center p-1 mr-3 rounded-lg focus:outline-none focus:ring focus:ring-white'
        >
          {showPassword ? (
            <HiEyeOff className='text-xl text-gray-400 cursor-pointer hover:text-gray-500' />
          ) : (
            <HiEye className='text-xl text-gray-400 cursor-pointer hover:text-gray-500' />
          )}
        </button>
      </div>
      {errors[id] && (
        <span className='text-xs text-red-500'>{errors[id].message}</span>
      )}
    </div>
  );
}
