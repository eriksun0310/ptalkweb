import React from 'react';
import { Image } from '@/shared/ui/Image';
import clsx from 'clsx';

export interface CommentImagesProps {
  images: string[];
  className?: string;
}

export const CommentImages: React.FC<CommentImagesProps> = ({ images, className }) => {
  if (!images || images.length === 0) return null;

  const imageCount = images.length;

  // 單張圖片：大圖顯示 - 更圓的角
  if (imageCount === 1) {
    return (
      <div className={clsx('mt-3', className)}>
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={images[0]}
            alt="評論圖片"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      </div>
    );
  }

  // 兩張圖片：左右排列 - 更圓的角
  if (imageCount === 2) {
    return (
      <div className={clsx('mt-3 grid grid-cols-2 gap-2', className)}>
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={image}
              alt={`評論圖片 ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 300px"
            />
          </div>
        ))}
      </div>
    );
  }

  // 三張或更多：網格佈局 - 圓角方形
  return (
    <div className={clsx('mt-3 grid grid-cols-3 gap-2', className)}>
      {images.slice(0, 6).map((image, index) => (
        <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={`評論圖片 ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 200px"
          />
          {/* 如果超過 6 張，在第 6 張顯示剩餘數量 */}
          {index === 5 && imageCount > 6 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">+{imageCount - 6}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
