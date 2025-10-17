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
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* 主要內容區 */}
      <div className="max-w-2xl mx-auto px-4 pt-20">
        {/* 店家資訊 */}
        <VenueInfo venue={venue} className="mb-6" />

        {/* 評論列表標題 */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            評論 ({total})
          </h2>
        </div>

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
