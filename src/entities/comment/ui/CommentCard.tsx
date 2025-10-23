'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Comment, CategoryType } from '@/shared/types';
import { UserAvatar } from '@/entities/user/ui';
import { RatingDisplay } from './RatingDisplay';
import { CommentImages } from './CommentImages';
import { getAvatarSource } from '@/shared/lib/avatar';
import { getPetFriendlyIcon } from '@/shared/constants/icons';
import { FaPaw, FaPoop } from 'react-icons/fa';
import clsx from 'clsx';

export interface CommentCardProps {
  comment: Comment;
  variant?: 'full' | 'preview';
  className?: string;
}

// 分類類型轉換成中文
const getCategoryName = (categoryType: CategoryType): string => {
  const categoryMap: Record<CategoryType, string> = {
    1: '餐廳',
    2: '咖啡廳',
    3: '旅館',
    4: '公園',
    5: '其他',
  };
  return categoryMap[categoryType] || '其他';
};

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  variant = 'full',
  className,
}) => {
  const router = useRouter();
  const { reviewer, venue, petInfo, petFriendlyLevel, feedback, content, files, updateTime, id } = comment;
  const isPreview = variant === 'preview';

  const handleCardClick = (e: React.MouseEvent) => {
    if (isPreview) {
      // 如果點擊的是連結，不要觸發卡片點擊
      const target = e.target as HTMLElement;
      if (target.closest('a')) {
        return;
      }
      router.push(`/comment/${id}`);
    }
  };

  // 預覽模式：截斷文字到 20 字
  const MAX_PREVIEW_LENGTH = 20;
  const shouldTruncate = isPreview && content.length > MAX_PREVIEW_LENGTH;
  const displayContent = shouldTruncate
    ? content.substring(0, MAX_PREVIEW_LENGTH)
    : content;

  // 格式化日期
  const date = new Date(updateTime);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  // 渲染評論評分（1-5 顆爪子/便便）- 根據 feedback.type 動態選擇圖標和顏色
  const renderRatingIcons = () => {
    const icons = [];
    const rating = Math.round(feedback.rating); // 取整數評分

    // 根據 feedback.type 決定圖標和顏色
    const isPaw = feedback.type === 1; // 1: 抓抓 (好評), 2: 便便 (負評)
    const Icon = isPaw ? FaPaw : FaPoop;
    const activeColor = isPaw ? 'text-[#ffc107c8]' : 'text-[#8B5E3C]';

    // 渲染填充的圖標
    for (let i = 0; i < rating; i++) {
      icons.push(
        <Icon key={i} className={`w-4 h-4 ${activeColor}`} />
      );
    }

    // 補齊灰色圖示到5個
    for (let i = rating; i < 5; i++) {
      icons.push(
        <Icon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return icons;
  };

  // 獲取頭像
  const avatarSrc = getAvatarSource({
    genderType: reviewer.genderType,
    partnerType: reviewer.partnerType,
  });

  // 獲取圖片 URLs
  const imageUrls = files.filter(f => !f.isDeleted).map(f => f.url);

  const cardContent = (
    <>
      {/* Header: 用戶資訊 */}
      <div className="flex items-start gap-3 mb-3">
        <UserAvatar src={avatarSrc} alt={reviewer.name} size="md" />
        <div className="flex-1 pr-10">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/user/${reviewer.userId}`} className="hover:underline">
              <span className="font-semibold text-gray-900">{reviewer.name}</span>
            </Link>
            <div className="flex gap-0.5">
              {renderRatingIcons()}
            </div>
          </div>

          {/* 第二行：寵物品種 | 分類 | 日期 | 友善程度 */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {petInfo && (
              <>
                <span className="whitespace-nowrap">{petInfo.breed}</span>
                <span>|</span>
              </>
            )}
            <span className="whitespace-nowrap">{getCategoryName(venue.categoryType)}</span>
            <span>|</span>
            <span className="whitespace-nowrap">{formattedDate}</span>
            {
              petFriendlyLevel &&(
                <>
                  <span>|</span>
                  <span className="flex-shrink-0">{getPetFriendlyIcon(petFriendlyLevel)}</span>
                </>
              )
            }
          </div>
        </div>
      </div>

      {/* 店家名稱 - 粗體單獨一行，可點擊跳轉 */}
      <Link href={`/venue/${venue.id}`}>
        <h3 className="font-bold text-base text-gray-900 mb-2 hover:text-primary cursor-pointer">
          {venue.name}
        </h3>
      </Link>

      {/* Content */}
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap mb-3">
        {displayContent}
        {shouldTruncate && <span className="text-gray-500">...更多</span>}
      </p>

      {/* Images */}
      {imageUrls && imageUrls.length > 0 && (
        <CommentImages
          images={imageUrls}
          variant={variant === 'preview' ? 'preview' : 'full'}
          venueName={venue.name}
          petBreed={petInfo?.breed}
        />
      )}
    </>
  );

  return (
    <article
      onClick={handleCardClick}
      className={clsx(
        'bg-white p-4 relative border-b border-gray-100',
        isPreview && 'cursor-pointer active:bg-gray-50 transition-colors',
        className
      )}
      itemScope
      itemType="https://schema.org/Review"
    >
      {cardContent}
    </article>
  );
};
