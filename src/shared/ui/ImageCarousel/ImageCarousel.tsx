'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '../Image';
import clsx from 'clsx';

export interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={clsx('relative', className)}>
      {/* 主圖片 */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black">
        <Image
          src={images[currentIndex]}
          alt={`圖片 ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 600px"
          priority={currentIndex === 0}
        />

        {/* 左右切換按鈕 */}
        {images.length > 1 && (
          <>
            {/* 左箭頭 */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="上一張"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* 右箭頭 */}
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="下一張"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        {/* 圖片計數器 */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded-full backdrop-blur-sm">
            <span className="text-white text-xs font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* 圖片指示點 */}
      {images.length > 1 && images.length <= 5 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={clsx(
                'w-1.5 h-1.5 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-primary w-4'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`前往第 ${index + 1} 張圖片`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
