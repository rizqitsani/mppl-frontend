import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const NextImage = ({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  ...rest
}) => {
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete');
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsx(
          imgClassName,
          'bg-gray-400 text-gray-400 ',
          status === 'loading' && clsx('animate-pulse', blurClassName)
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        layout='responsive'
        {...rest}
      />
    </figure>
  );
};

export default NextImage;
