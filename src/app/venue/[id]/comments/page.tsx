'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal, SearchX, XCircle, Inbox } from 'lucide-react';
import { CommentCard } from '@/entities/comment/ui';
import { useVenueCommentsInfinite, useVenue } from '@/shared/hooks';
import { FilterSheet } from '@/shared/ui/FilterSheet';
import type { FilterState } from '@/shared/ui/FilterSheet';
import type { Comment } from '@/shared/types';

export default function VenueCommentsPage() {
  const params = useParams();
  const router = useRouter();
  const venueId = params.id as string;

  const { venue, isLoading: isLoadingVenue } = useVenue(venueId);
  const {
    comments,
    totalCount,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVenueCommentsInfinite(venueId, 10); // 每頁載入 10 則評論

  // 篩選狀態
  const [filters, setFilters] = useState<FilterState>({
    feedbackType: null,
    petFriendlyLevel: null,
  });

  // 篩選面板開關狀態
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 本地篩選邏輯：根據篩選條件過濾評論
  const filteredComments = useMemo(() => {
    return comments.filter((comment: Comment) => {
      // 評價篩選
      if (filters.feedbackType !== null && comment.feedback.type !== filters.feedbackType) {
        return false;
      }

      // 寵物友善程度篩選
      if (filters.petFriendlyLevel !== null && comment.petFriendlyLevel !== filters.petFriendlyLevel) {
        return false;
      }

      return true;
    });
  }, [comments, filters]);

  // 套用篩選
  const handleApplyFilter = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

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
  if (isLoading || isLoadingVenue) {
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
      <div className="min-h-screen bg-white">
        {/* 頁首 */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center flex-1">
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-gray-900">
                  {venue?.name || '店家評論'}
                </h1>
                <p className="text-sm text-gray-500">共 0 則評論</p>
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SlidersHorizontal className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[60vh]">
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

        {/* 篩選面板 */}
        <FilterSheet
          isOpen={isFilterOpen}
          filters={filters}
          categoryType={venue?.categoryType}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilter}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 頁首 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center flex-1">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">
                {venue?.name || '店家評論'}
              </h1>
              <p className="text-sm text-gray-500">
                共 {totalCount} 則評論
                {filteredComments.length !== comments.length &&
                  ` · 顯示 ${filteredComments.length} 則`
                }
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <SlidersHorizontal className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* 評論列表 */}
      <div>
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} variant="preview" />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center px-4">
              <div className="flex justify-center mb-4">
                <SearchX className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                沒有符合的評論
              </h2>
              <p className="text-gray-600">請嘗試調整篩選條件</p>
            </div>
          </div>
        )}
      </div>

      {/* 載入更多觸發區域 */}
      {filteredComments.length > 0 && (
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
      )}

      {/* 篩選面板 */}
      <FilterSheet
        isOpen={isFilterOpen}
        filters={filters}
        categoryType={venue?.categoryType}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilter}
      />
    </div>
  );
}
