'use client';

// 使用者評論列表 Hook

import { useQuery } from '@tanstack/react-query';
import { getUserComments } from '@/entities/user/api';
import type { CommentListResponse } from '@/shared/types';

/**
 * 使用者評論列表 Hook
 * @param userId - 使用者 ID
 * @param pageSize - 每頁筆數（預設 15）
 */
export function useUserComments(userId: string, pageSize: number = 15) {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<CommentListResponse, Error>({
    queryKey: ['userComments', userId, pageSize],
    queryFn: () => getUserComments(userId, 1, pageSize),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    /** 評論列表 */
    comments: data?.items || [],
    /** 總評論數 */
    totalCount: data?.totalCount || 0,
    /** 總頁數 */
    pageCount: data?.pageCount || null,
    /** 當前頁碼 */
    currentPage: data?.currentPage || 1,
    /** 每頁筆數 */
    pageSize: data?.pageSize || pageSize,
    /** 是否正在載入 */
    isLoading,
    /** 是否發生錯誤 */
    isError,
    /** 錯誤物件 */
    error,
  };
}
