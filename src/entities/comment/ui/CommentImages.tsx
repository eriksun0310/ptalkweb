import React from 'react';
import { Image } from '@/shared/ui/Image';
import { ImageCarousel } from '@/shared/ui/ImageCarousel';
import clsx from 'clsx';

export interface CommentImagesProps {
  images: string[];
  className?: string;
  variant?: 'preview' | 'full';
  /** 評論相關的店家名稱（用於改善 alt 描述） */
  venueName?: string;
  /** 評論相關的寵物品種（用於改善 alt 描述） */
  petBreed?: string;
}

export const CommentImages: React.FC<CommentImagesProps> = ({
  images,
  className,
  variant = 'preview',
  venueName,
  petBreed
}) => {
  if (!images || images.length === 0) return null;

  // 生成更具描述性的 alt 文字
  const getAltText = (index: number) => {
    const parts = [];
    if (venueName) parts.push(venueName);
    if (petBreed) parts.push(petBreed);
    parts.push(`寵物評論照片 ${index + 1}`);
    return parts.join(' - ');
  };

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
              alt={getAltText(index)}
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
