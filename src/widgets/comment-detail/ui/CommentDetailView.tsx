import React from 'react';
import type { Comment, RelatedCommentsResponse } from '@/shared/types';
import { CommentCard } from '@/entities/comment/ui';
import { RelatedComments } from './RelatedComments';

export interface CommentDetailViewProps {
  comment: Comment;
  relatedComments: RelatedCommentsResponse;
}

export const CommentDetailView: React.FC<CommentDetailViewProps> = ({
  comment,
  relatedComments,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* 主要內容區 */}
      <div className="max-w-2xl mx-auto px-4 pt-20">
        {/* 評論卡片 - 完整版，圖片可放大 */}
        <CommentCard comment={comment} variant="full" className="mb-4" />

        {/* 其他評論 */}
        {relatedComments.items.length > 0 && (
          <RelatedComments
            comments={relatedComments.items}
            total={relatedComments.total}
            className="mb-6"
          />
        )}
      </div>
    </div>
  );
};
