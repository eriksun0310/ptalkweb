'use client';

import { useParams } from 'next/navigation';
import { CommentDetailView } from '@/widgets/comment-detail/ui';
import { useComment } from '@/shared/hooks';

export default function CommentDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { comment, isLoading, isError, error } = useComment(id);

  // 載入中狀態
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (isError || !comment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            載入失敗
          </h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : '找不到此評論'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition-colors"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  // 暫時不顯示相關評論，等之後實作
  return <CommentDetailView comment={comment} relatedComments={{ items: [], total: 0 }} />;
}
