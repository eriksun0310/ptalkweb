'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Venue, Comment } from '@/shared/types';
import { VenueInfo } from '@/entities/venue/ui';
import { CommentCard } from '@/entities/comment/ui';
import { Tabs } from '@/shared/ui/Tabs';
import { BusinessHours } from '@/shared/ui/BusinessHours';
import { RatingSummary } from '@/shared/ui/RatingSummary';
import { MapPin } from 'lucide-react';

export interface VenueDetailViewProps {
  venue: Venue;
  comments: Comment[];
  totalCount: number;
}

export const VenueDetailView: React.FC<VenueDetailViewProps> = ({
  venue,
  comments,
  totalCount,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // 準備營業時間資料
  const weeklyHours = [
    { day: '星期一', hours: '上午 11:00 - 晚上 10:00', isToday: false },
    { day: '星期二', hours: '上午 11:00 - 晚上 10:00', isToday: false },
    { day: '星期三', hours: '上午 11:00 - 晚上 10:00', isToday: false },
    { day: '星期四', hours: '上午 11:00 - 晚上 10:00', isToday: false },
    { day: '星期五', hours: '上午 11:00 - 晚上 10:00', isToday: false },
    { day: '星期六', hours: '上午 11:00 - 晚上 10:00', isToday: true },
    { day: '星期日', hours: '上午 11:00 - 晚上 10:00', isToday: false },
  ];

  // 使用真實 API 資料的評分分佈（從 venue.ratingSummary 取得）
  const pawDistribution = venue.ratingSummary?.distribution?.positive || {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  };
  const poopDistribution = venue.ratingSummary?.distribution?.negative || {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  };

  const tabs = [
    { id: 'overview', label: '總覽' },
    { id: 'reviews', label: '評論' },
  ];

  return (
    <div className="bg-white">
      {/* 店家頂部資訊 */}
      <VenueInfo venue={venue} />

      {/* 用戶實拍照片 */}
      {/* {comments.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-900 mb-3">
            用戶實拍 · 來自 @{comments[0]?.reviewer.name || 'user'}
          </h2>
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={`https://via.placeholder.com/96x96/E5E7EB/6B7280?text=照片${index}`}
                  alt={`照片 ${index}`}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Tab 切換 */}
      <Tabs tabs={tabs} defaultTab="overview" onChange={setActiveTab} />

      {/* Tab 內容 */}
      <div className="px-4">
        {activeTab === 'overview' && (
          <div>
            {/* 地址 */}
            {venue.address && (
              <div className="flex items-start gap-2 py-3 border-b border-gray-200">
                <MapPin className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{venue.address}</span>
              </div>
            )}

            {/* 營業時間 */}
            <BusinessHours
              isOpen={true}
              currentHours="11:00"
              weeklyHours={weeklyHours}
            />

            {/* 評論摘要 */}
            <div className="border-b border-gray-200 pt-3">
              <h3 className="text-base font-bold text-gray-900 mb-2">評論摘要</h3>
              <RatingSummary
                pawRating={venue.ratingSummary?.positive?.rating ?? 0}
                pawCount={venue.ratingSummary?.positive?.count ?? 0}
                pawDistribution={pawDistribution}
                poopRating={venue.ratingSummary?.negative?.rating ?? 0}
                poopCount={venue.ratingSummary?.negative?.count ?? 0}
                poopDistribution={poopDistribution}
              />
            </div>

            {/* 使用者評論 */}
            <div className="pt-4 pb-4 space-y-4">
              {comments.slice(0, 2).map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  variant="preview"
                />
              ))}
            </div>

            {/* 查看所有評論按鈕 */}
            {totalCount > 2 && (
              <div className="pb-8 text-center">
                <Link
                  href={`/venue/${venue.id}/comments`}
                  className="text-primary font-medium hover:underline"
                >
                  查看所有評論 ({totalCount})
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            {/* 評論摘要 */}
            <div className="border-b border-gray-200 pt-3">
              <h3 className="text-base font-bold text-gray-900 mb-2">評論摘要</h3>
              <RatingSummary
                pawRating={venue.ratingSummary?.positive?.rating ?? 0}
                pawCount={venue.ratingSummary?.positive?.count ?? 0}
                pawDistribution={pawDistribution}
                poopRating={venue.ratingSummary?.negative?.rating ?? 0}
                poopCount={venue.ratingSummary?.negative?.count ?? 0}
                poopDistribution={poopDistribution}
              />
            </div>

            {/* 評論列表 */}
            <div className="pt-4 pb-8 space-y-4">
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  variant="preview"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
