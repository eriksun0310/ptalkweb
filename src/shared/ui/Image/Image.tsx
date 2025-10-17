import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import clsx from 'clsx';

export interface ImageProps extends Omit<NextImageProps, 'alt'> {
  alt: string;
  className?: string;
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
}

export const Image: React.FC<ImageProps> = ({
  alt,
  className,
  rounded = 'md',
  ...props
}) => {
  const roundedStyles = {
    none: '',
    xs: 'rounded-xs',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    xxl: 'rounded-xxl',
    full: 'rounded-full',
  };

  return (
    <NextImage
      alt={alt}
      className={clsx(roundedStyles[rounded], className)}
      {...props}
    />
  );
};
