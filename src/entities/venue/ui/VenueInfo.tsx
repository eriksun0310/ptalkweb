import React from 'react';
import { Image } from '@/shared/ui/Image';
import type { Venue } from '@/shared/types';
import { MapPin } from 'lucide-react';
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
    const colorClass = type === 'paw' ? 'text-[#FFB800]' : 'text-gray-300';

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

  const pawRating = venue.pawRating ?? 0;
  const pawCount = venue.pawCount ?? 0;
  const poopRating = venue.poopRating ?? 0;
  const poopCount = venue.poopCount ?? 0;

  return (
    <div className={clsx('bg-white', className)}>
      {/* 店家圖片 - 全寬 */}
      {venue.mainImage && (
        <div className="relative w-full aspect-video">
          <Image
            src={venue.mainImage}
            alt={venue.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* 店家資訊 */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{venue.name}</h1>

        {/* 評分行 */}
        <div className="flex items-center gap-3 mb-2">
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
        <div className="text-sm mb-2">
          <span className="text-green-600 font-medium">營業中</span>
          <span className="text-gray-600"> · 開放營業時間：11:00</span>
        </div>

        {/* 地址 */}
        {venue.address && (
          <div className="flex items-start gap-2 text-gray-700">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{venue.address}</span>
          </div>
        )}
      </div>
    </div>
  );
};
