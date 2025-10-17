import React from 'react';
import { Image } from '@/shared/ui/Image';
import type { Venue } from '@/shared/types';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';

export interface VenueInfoProps {
  venue: Venue;
  className?: string;
}

export const VenueInfo: React.FC<VenueInfoProps> = ({ venue, className }) => {
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
      <div className="p-4 space-y-2">
        <h1 className="text-xl font-bold text-gray-900">{venue.name}</h1>

        {/* 評分與評論數 */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">{venue.rating.toFixed(1)}</span>
          <span className="text-gray-600">{venue.reviewCount} 則評論</span>
        </div>

        {/* 地址 */}
        <div className="flex items-start gap-2 text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="text-sm leading-snug">{venue.address}</span>
        </div>
      </div>
    </div>
  );
};
