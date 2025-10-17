import React from 'react';
import { Image } from '@/shared/ui/Image';
import { ImageCarousel } from '@/shared/ui/ImageCarousel';
import clsx from 'clsx';

export interface CommentImagesProps {
  images: string[];
  className?: string;
  variant?: 'preview' | 'full';
}

export const CommentImages: React.FC<CommentImagesProps> = ({
  images,
  className,
  variant = 'preview'
}) => {
  if (!images || images.length === 0) return null;

  // preview 模式：最多顯示 3 張小圖
  if (variant === 'preview') {
    const displayImages = images.slice(0, 3);

    return (
      <div className={clsx('mt-3 flex gap-2', className)}>
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={image}
              alt={`評論圖片 ${index + 1}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ))}
      </div>
    );
  }

  // full 模式：使用輪播組件，支援左右切換
  return <ImageCarousel images={images} className={clsx('mt-3', className)} />;
};
