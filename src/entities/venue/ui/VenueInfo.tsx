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

  return (
    <div className={clsx('bg-white rounded-2xl overflow-hidden shadow-sm', className)}>
      {/* 店家圖片 - 全寬 */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={venue.mainImage}
          alt={venue.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
      </div>

      {/* 店家資訊 */}
      <div className="p-4 space-y-3">
        <h1 className="text-xl font-bold text-gray-900">{venue.name}</h1>

        {/* 抓抓評分 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900 w-12">
            {venue.pawRating.toFixed(1)}
          </span>
          <div className="flex gap-1">
            {renderRatingIcons(venue.pawRating, 'paw')}
          </div>
          <span className="text-sm text-gray-600">({venue.pawCount})</span>
        </div>

        {/* 便便評分 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900 w-12">
            {venue.poopRating.toFixed(1)}
          </span>
          <div className="flex gap-1">
            {renderRatingIcons(venue.poopRating, 'poop')}
          </div>
          <span className="text-sm text-gray-600">({venue.poopCount})</span>
        </div>

        {/* 地址 */}
        <div className="flex items-start gap-2 text-gray-600 pt-2">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="text-sm leading-snug">{venue.address}</span>
        </div>
      </div>
    </div>
  );
};
