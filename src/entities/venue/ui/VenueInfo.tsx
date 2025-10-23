import React from 'react';
import { Image } from '@/shared/ui/Image';
import type { Venue } from '@/shared/types';
import { FaPaw, FaPoop } from 'react-icons/fa';
import clsx from 'clsx';

export interface VenueInfoProps {
  venue: Venue;
  className?: string;
}

export const VenueInfo: React.FC<VenueInfoProps> = ({ venue, className }) => {
  // 渲染評分圖示（爪子或便便）
  const renderRatingIcons = (rating: number, type: 'paw' | 'poop') => {
    const fullStars = Math.floor(rating);
    const icons = [];
    const Icon = type === 'paw' ? FaPaw : FaPoop;
    const colorClass = type === 'paw' ? 'text-[#ffc107c8]' : 'text-gray-300';

    for (let i = 0; i < 5; i++) {
      icons.push(
        <Icon
          key={i}
          className={clsx('w-4 h-4', i < fullStars ? colorClass : 'text-gray-300')}
        />
      );
    }
    return icons;
  };

  const pawRating = venue.ratingSummary?.positive?.rating ?? 0;
  const pawCount = venue.ratingSummary?.positive?.count ?? 0;
  const poopRating = venue.ratingSummary?.negative?.rating ?? 0;
  const poopCount = venue.ratingSummary?.negative?.count ?? 0;

  return (
    <div className={clsx('bg-white', className)}>
      {/* 店家圖片 - 全寬 */}
      {venue.images && venue.images.length > 0 && (
        <div className="relative w-full aspect-video">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* 店家資訊 */}
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{venue.name}</h1>

        {/* 評分行 */}
        <div className="flex  mb-2 flex-col">
          {/* 抓抓評分 */}
          <div className="flex items-center gap-1">
            <span className="text-base font-bold text-gray-900">
              {pawRating.toFixed(1)}
            </span>
            <div className="flex gap-0.5">
              {renderRatingIcons(pawRating, 'paw')}
            </div>
            <span className="text-xs text-gray-500">({pawCount})</span>
          </div>

          {/* 便便評分 */}
          <div className="flex items-center gap-1">
            <span className="text-base font-bold text-gray-900">
              {poopRating.toFixed(1)}
            </span>
            <div className="flex gap-0.5">
              {renderRatingIcons(poopRating, 'poop')}
            </div>
            <span className="text-xs text-gray-500">({poopCount})</span>
          </div>
        </div>

        {/* 營業狀態 */}
        <div className="text-sm">
          <span className="text-green-600 font-medium">營業中</span>
          <span className="text-gray-600"> · 開放營業時間：11:00</span>
        </div>
      </div>
    </div>
  );
};
