'use client';

// 店家評論列表 Hook

import { useQuery } from '@tanstack/react-query';
import { getVenueComments } from '@/entities/venue/api';
import type { Comment } from '@/shared/types';

/**
 * 店家評論列表 Hook
 * @param venueId - 店家 ID
 * @param pageSize - 每頁筆數（預設 10）
 */
export function useVenueComments(venueId: string, pageSize: number = 10) {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['venueComments', venueId, pageSize],
    queryFn: () => getVenueComments(venueId, 1, pageSize),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const comments: Comment[] = data?.items || [];
  const total = data?.total || 0;

  return {
    /** 評論列表 */
    comments,
    /** 總評論數 */
    total,
    /** 是否正在載入 */
    isLoading,
    /** 是否發生錯誤 */
    isError,
    /** 錯誤物件 */
    error,
  };
}
