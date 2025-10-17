import React from 'react';
import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';

export interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className,
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={clsx('relative overflow-hidden', sizeStyles[size], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        rounded="full"
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};
