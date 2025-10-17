import React from 'react';
import type { CommentListResponse } from '@/shared/types';
import { UserAvatar } from '@/entities/user/ui';
import { CommentCard } from '@/entities/comment/ui';
import { DownloadCTA } from '@/features/download-app/ui';

export interface UserProfileViewProps {
  user: {
    userId: string;
    name: string;
    avatar: string;
    commentCount: number;
  };
  comments: CommentListResponse;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({ user, comments }) => {
  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="max-w-2xl mx-auto px-4 pt-20">
        {/* 用戶資訊 - 無卡片包裝 */}
        <div className="flex flex-col items-center text-center mb-6">
          <UserAvatar src={user.avatar} alt={user.name} size="xl" className="mb-3" />
          <h1 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h1>
          <p className="text-sm text-gray-600">{user.commentCount} 則評論</p>
        </div>

        {/* 評論列表 */}
        {comments.items.length > 0 ? (
          <>
            <div className="space-y-4">
              {comments.items.map((comment) => (
                <CommentCard key={comment.id} comment={comment} variant="preview" />
              ))}
            </div>

            {/* 查看更多提示 */}
            {comments.total > comments.items.length && (
              <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center">
                <p className="text-sm text-gray-900 font-semibold mb-2">
                  還有 {comments.total - comments.items.length} 則評論
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  下載 PTalk App 查看所有評論
                </p>
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                  查看全部 {comments.total} 則評論
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-600">尚無評論</p>
          </div>
        )}

      </div>
    </div>
  );
};
