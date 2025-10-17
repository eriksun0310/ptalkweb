import React from 'react';
import Link from 'next/link';
import type { Comment } from '@/shared/types';
import { UserAvatar } from '@/entities/user/ui';
import { RatingDisplay } from './RatingDisplay';
import { CommentImages } from './CommentImages';
import clsx from 'clsx';

export interface CommentCardProps {
  comment: Comment;
  variant?: 'full' | 'preview';
  className?: string;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  variant = 'full',
  className,
}) => {
  const { user, content, rating, feedbackType, images, createdAt, id } = comment;
  const isPreview = variant === 'preview';

  // 預覽模式：截斷文字到 100 字
  const displayContent =
    isPreview && content.length > 100 ? `${content.substring(0, 100)}...` : content;

  // 格式化日期
  const formattedDate = new Date(createdAt).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl p-5 shadow-sm',
        className
      )}
    >
      {/* Header: 用戶資訊 */}
      <div className="flex items-center gap-3 mb-4">
        <UserAvatar src={user.avatar} alt={user.name} size="md" />
        <div className="flex-1">
          <Link href={`/u/${user.id}`} className="hover:underline">
            <p className="font-semibold text-gray-900">{user.name}</p>
          </Link>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <RatingDisplay rating={rating} feedbackType={feedbackType} size="md" />
      </div>

      {/* Content */}
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
        {displayContent}
      </p>

      {/* Images */}
      {images && images.length > 0 && (
        <CommentImages images={isPreview ? images.slice(0, 3) : images} />
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
