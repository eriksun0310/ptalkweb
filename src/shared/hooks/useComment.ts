'use client';

// 單則評論資料 Hook

import { useQuery } from '@tanstack/react-query';
import { getComment } from '@/entities/comment/api';
import type { Comment } from '@/shared/types';

/**
 * 單則評論資料 Hook
 * @param id - 評論 ID
 */
export function useComment(id: string) {
  const {
    data: comment,
    error,
    isLoading,
    isError,
  } = useQuery<Comment, Error>({
    queryKey: ['comment', id],
    queryFn: () => getComment(id),
    // 資料保持新鮮的時間（5 分鐘）
    staleTime: 5 * 60 * 1000,
    // 啟用快取
    gcTime: 10 * 60 * 1000,
  });

  return {
    /** 評論資料 */
    comment,
    /** 是否正在載入 */
    isLoading,
    /** 是否發生錯誤 */
    isError,
    /** 錯誤物件 */
    error,
  };
}
