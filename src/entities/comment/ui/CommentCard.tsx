'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Comment, CategoryType } from '@/shared/types';
import { UserAvatar } from '@/entities/user/ui';
import { RatingDisplay } from './RatingDisplay';
import { CommentImages } from './CommentImages';
import { HandWithHeartsIcon } from '@/shared/ui/HandWithHeartsIcon';
import { getAvatarSource, getUserLevel } from '@/shared/lib/avatar';
import { FaPaw } from 'react-icons/fa';
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
      router.push(`/r/${id}`);
    }
  };

  // 預覽模式：截斷文字到 100 字
  const displayContent =
    isPreview && content.length > 100 ? `${content.substring(0, 100)}...` : content;

  // 格式化日期
  const date = new Date(updateTime);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  // 獲取用戶等級（假設從 commentCount 計算，這裡暫時寫死）
  const userLevel = getUserLevel(23); // 先寫死，實際應該從 API 取得

  // 渲染用戶等級爪子
  const renderUserLevelPaws = () => {
    const paws = [];
    for (let i = 0; i < userLevel; i++) {
      paws.push(
        <FaPaw key={i} className="w-4 h-4 text-[#FFB800]" />
      );
    }
    // 補齊灰色爪子到5個
    for (let i = userLevel; i < 5; i++) {
      paws.push(
        <FaPaw key={i} className="w-4 h-4 text-gray-300" />
      );
    }
    return paws;
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
            <Link href={`/u/${reviewer.userId}`} className="hover:underline">
              <span className="font-semibold text-gray-900">{reviewer.name}</span>
            </Link>
            <div className="flex gap-0.5">
              {renderUserLevelPaws()}
            </div>
          </div>

          {/* 第二行：寵物品種 | 分類 | 日期 | 友善程度 */}
          <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
            <span>{petInfo.breed}</span>
            <span>|</span>
            <span>{getCategoryName(venue.categoryType)}</span>
            <span>|</span>
            <span>{formattedDate}</span>
            <span>|</span>
            <HandWithHeartsIcon level={petFriendlyLevel} size={24} />
          </div>
        </div>
      </div>

      {/* 店家名稱 - 粗體單獨一行，可點擊跳轉 */}
      <Link href={`/v/${venue.id}`}>
        <h3 className="font-bold text-base text-gray-900 mb-2 hover:text-primary cursor-pointer">
          {venue.name}
        </h3>
      </Link>

      {/* Content */}
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap mb-3">
        {displayContent}
      </p>

      {/* Images */}
      {imageUrls && imageUrls.length > 0 && (
        <CommentImages
          images={imageUrls}
          variant={variant === 'preview' ? 'preview' : 'full'}
        />
      )}
    </>
  );

  return (
    <div
      onClick={handleCardClick}
      className={clsx(
        'bg-white rounded-2xl p-5 shadow-md border border-gray-100 relative',
        isPreview && 'cursor-pointer',
        className
      )}
    >
      {cardContent}
    </div>
  );
};
