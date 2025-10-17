import React from 'react';
import Link from 'next/link';
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
  const { reviewer, venue, petInfo, petFriendlyLevel, feedback, content, files, updateTime, id } = comment;
  const isPreview = variant === 'preview';

  // 預覽模式：截斷文字到 100 字
  const displayContent =
    isPreview && content.length > 100 ? `${content.substring(0, 100)}...` : content;

  // 格式化日期
  const formattedDate = new Date(updateTime).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

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

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl p-5 shadow-sm relative',
        className
      )}
    >
      {/* 右上角評論等級圖示 */}
      <div className="absolute top-4 right-4">
        <HandWithHeartsIcon level={petFriendlyLevel} size={24} />
      </div>

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

          {/* 第二行：店家名稱 | 分類 | 日期 | 評分badge */}
          <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
            <span>{venue.name}</span>
            <span>|</span>
            <span>{getCategoryName(venue.categoryType)}</span>
            <span>|</span>
            <span>{formattedDate}</span>
            <span>|</span>
            <RatingDisplay rating={feedback.rating} feedbackType={feedback.type} size="sm" showLabel={false} />
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap mb-3">
        {displayContent}
      </p>

      {/* Images */}
      {imageUrls && imageUrls.length > 0 && (
        <CommentImages images={isPreview ? imageUrls.slice(0, 3) : imageUrls} />
      )}

      {/* Preview Mode: 查看完整評論連結 */}
      {isPreview && (
        <Link
          href={`/r/${id}`}
          className="inline-block mt-4 text-blue-600 text-sm font-semibold hover:underline"
        >
          查看完整評論 →
        </Link>
      )}
    </div>
  );
};
