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
        <div className="mt-6 p-5 bg-gray-50 rounded-xl text-center border border-gray-100">
          <p className="text-sm text-gray-700 mb-3">
            還有 <span className="font-semibold text-gray-900">{total - comments.length}</span> 則評論
          </p>
          <a
            href="https://ptalk.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full transition-colors text-sm font-medium"
          >
            在 App 查看更多
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};
