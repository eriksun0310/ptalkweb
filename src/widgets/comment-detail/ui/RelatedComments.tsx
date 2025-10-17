import React from 'react';
import type { Comment } from '@/shared/types';
import { CommentCard } from '@/entities/comment/ui';

export interface RelatedCommentsProps {
  comments: Comment[];
  total: number;
  className?: string;
}

export const RelatedComments: React.FC<RelatedCommentsProps> = ({
  comments,
  total,
  className,
}) => {
  if (!comments || comments.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-h3 font-bold text-text-primary">其他人怎麼說</h2>
        <span className="text-body-small text-text-secondary">共 {total} 則評論</span>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} variant="preview" />
        ))}
      </div>

      {/* 查看更多提示 */}
      {total > comments.length && (
        <div className="mt-6 p-4 bg-background rounded-lg text-center">
          <p className="text-body text-text-secondary mb-2">
            還有 {total - comments.length} 則評論
          </p>
          <p className="text-body-small text-text-light">
            下載 App 查看完整評論
          </p>
        </div>
      )}
    </div>
  );
};
