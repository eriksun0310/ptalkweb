'use client';

// 使用者資料 Hook

import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/entities/user/api';
import type { User } from '@/shared/types';

/**
 * 使用者資料 Hook
 * @param id - 使用者 ID
 */
export function useUser(id: string) {
  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    /** 使用者資料 */
    user,
    /** 是否正在載入 */
    isLoading,
    /** 是否發生錯誤 */
    isError,
    /** 錯誤物件 */
    error,
  };
}
