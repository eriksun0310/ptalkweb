'use client';

// 評論列表無限滾動 Hook

import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '@/entities/comment/api';
import type { Comment } from '@/shared/types';

/**
 * 評論列表無限滾動 Hook
 * @param pageSize - 每頁筆數（預設 10）
 */
export function useComments(pageSize: number = 10) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['comments', pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getComments({
        Page: pageParam,
        PageSize: pageSize,
      });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      // 計算已載入的評論總數
      const loadedCount = allPages.reduce(
        (acc, page) => acc + page.items.length,
        0
      );

      // 如果已載入數量小於總數，返回下一頁頁碼
      if (loadedCount < lastPage.totalCount) {
        return allPages.length + 1;
      }

      // 沒有更多資料
      return undefined;
    },
    initialPageParam: 1,
  });

  // 將所有頁面的評論合併成一個陣列
  const comments: Comment[] =
    data?.pages.flatMap((page) => page.items) ?? [];

  // 總評論數
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return {
    /** 評論列表 */
    comments,
    /** 總評論數 */
    totalCount,
    /** 是否正在載入初始資料 */
    isLoading,
    /** 是否發生錯誤 */
    isError,
    /** 錯誤物件 */
    error,
    /** 載入下一頁 */
    fetchNextPage,
    /** 是否有下一頁 */
    hasNextPage,
    /** 是否正在載入下一頁 */
    isFetchingNextPage,
  };
}
