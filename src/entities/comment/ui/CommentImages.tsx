import React from 'react';
import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';

export interface CommentImagesProps {
  images: string[];
  className?: string;
}

export const CommentImages: React.FC<CommentImagesProps> = ({ images, className }) => {
  if (!images || images.length === 0) return null;

  // 最多顯示 3 張圖片
  const displayImages = images.slice(0, 3);
  const imageCount = displayImages.length;

  // 統一使用小尺寸的橫向排列，圓角方形
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
};
