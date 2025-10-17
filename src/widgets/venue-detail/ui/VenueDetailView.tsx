import React from 'react';
import type { Venue, Comment } from '@/shared/types';
import { VenueInfo } from '@/entities/venue/ui';
import { CommentCard } from '@/entities/comment/ui';

export interface VenueDetailViewProps {
  venue: Venue;
  comments: Comment[];
  total: number;
}

export const VenueDetailView: React.FC<VenueDetailViewProps> = ({
  venue,
  comments,
  total,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 店家資訊 - 無左右 padding */}
      <VenueInfo venue={venue} />

      {/* 評論區 */}
      <div className="px-4 py-4">
        {/* 評論列表標題 */}
        <h2 className="text-base font-bold text-gray-900 mb-3">
          用戶實拍 · 來自 @{comments[0]?.reviewer.name || 'user'}
        </h2>

        {/* 評論列表 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              variant="preview"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
