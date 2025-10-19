'use client';

// 店家資料 Hook

import { useQuery } from '@tanstack/react-query';
import { getVenue } from '@/entities/venue/api';
import type { VenueDetail } from '@/shared/types';

/**
 * 店家資料 Hook
 * @param id - 店家 ID
 */
export function useVenue(id: string) {
  const {
    data: venue,
    error,
    isLoading,
    isError,
  } = useQuery<VenueDetail, Error>({
    queryKey: ['venue', id],
    queryFn: () => getVenue(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    /** 店家資料 */
    venue,
    /** 是否正在載入 */
    isLoading,
    /** 是否發生錯誤 */
    isError,
    /** 錯誤物件 */
    error,
  };
}
