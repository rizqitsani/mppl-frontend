import * as React from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
  width: string | number;
  height: string | number;
} & ImageProps;

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
}: NextImageProps) => {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  );
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsx(
          'text-gray-400 ',
          imgClassName,
          status === 'loading' &&
            clsx('bg-gray-400 animate-pulse', blurClassName)
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
