import React from 'react';
import type { Comment, RelatedCommentsResponse } from '@/shared/types';
import { VenueInfo } from '@/entities/venue/ui';
import { CommentCard } from '@/entities/comment/ui';
import { DownloadCTA } from '@/features/download-app/ui';
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
        {/* 店家資訊 */}
        <VenueInfo venue={comment.venue} className="mb-4" />

        {/* 評論卡片 - 完整版 */}
        <CommentCard comment={comment} variant="full" className="mb-4" />

        {/* 中間下載 CTA */}
        <DownloadCTA
          title="發現更多寵物友善店家"
          description="下載 PTalk App，探索附近的友善店家"
          className="mb-6"
        />

        {/* 其他評論 */}
        {relatedComments.items.length > 0 && (
          <RelatedComments
            comments={relatedComments.items}
            total={relatedComments.total}
            className="mb-6"
          />
        )}

        {/* 底部下載 CTA */}
        {/* <DownloadCTA
          title="加入 PTalk 社群"
          description="分享你的寵物友善店家體驗"
        /> */}
      </div>
    </div>
  );
};
