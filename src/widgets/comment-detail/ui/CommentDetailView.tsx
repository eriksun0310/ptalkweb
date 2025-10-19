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
    <div className="min-h-screen bg-white">
      {/* 評論卡片 - 完整版 */}
      <CommentCard comment={comment} variant="full" />

      {/* 其他評論 */}
      {relatedComments.items.length > 0 && (
        <div className="px-4 py-4">
          <RelatedComments
            comments={relatedComments.items}
            totalCount={relatedComments.totalCount}
          />
        </div>
      )}
    </div>
  );
};
