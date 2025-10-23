'use client';

import { useEffect, useRef, useState } from 'react';
import { XCircle, Inbox } from 'lucide-react';
import { CommentCard } from '@/entities/comment/ui';
import { useComments } from '@/shared/hooks';
import { detectDevice, getStoreUrl, getButtonText, type DeviceType } from '@/shared/lib/deeplink';

export default function HomePageClient() {
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);
  const {
    comments,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useComments(10); // 每頁載入 10 則評論

  // 無限滾動：使用 Intersection Observer 偵測滾動到底部
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 當目標元素進入視窗且有下一頁時，載入更多資料
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 } // 當 10% 的元素進入視窗時觸發
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            載入失敗
          </h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : '請稍後再試'}
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

  // 沒有評論資料
  if (comments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="flex justify-center mb-4">
            <Inbox className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            目前沒有評論
          </h2>
          <p className="text-gray-600">快來成為第一個分享的人吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 評論列表 */}
      <div>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} variant="preview" />
        ))}
      </div>

      {/* 載入更多觸發區域 - 簡潔版 */}
      <div ref={loadMoreRef} className="py-6 text-center">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
            <span>載入更多</span>
          </div>
        )}

        {!hasNextPage && comments.length > 0 && (
          <div className="text-gray-400 text-sm py-4">
            已經到底囉！沒有更多資料了
          </div>
        )}
      </div>

      {/* App Download CTA - 簡潔版 */}
      <div className="py-6 px-4 text-center">
        <p className="text-sm text-gray-600 mb-3">
          在 PTalk App 探索更多店家評論
        </p>
        {device === 'android' ? (
          <span className="inline-flex items-center gap-2 bg-gray-300 text-gray-500 px-8 py-2.5 rounded-full text-sm font-semibold cursor-not-allowed">
            {getButtonText(device, 'cta')}
          </span>
        ) : (
          <a
            href={getStoreUrl(device)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-full transition-colors text-sm font-semibold"
          >
            {getButtonText(device, 'cta')}
          </a>
        )}
      </div>
    </div>
  );
}
