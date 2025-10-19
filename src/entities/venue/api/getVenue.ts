// Venue API functions

import { get } from '@/shared/api/client';
import type { VenueDetail, CommentListResponse } from '@/shared/types';

/**
 * 取得店家詳細資料
 * @param id - 店家 ID
 * @returns VenueDetail
 */
export async function getVenue(id: string): Promise<VenueDetail> {
  return get<VenueDetail>(`/venue/${id}`);
}

/**
 * 取得店家的評論列表
 * @param venueId - 店家 ID
 * @param page - 頁碼（預設 1）
 * @param pageSize - 每頁筆數（預設 10）
 * @returns CommentListResponse
 */
export async function getVenueComments(
  venueId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<CommentListResponse> {
  return get<CommentListResponse>(`/comment/venues/${venueId}`, {
    page,
    pageSize,
    sortBy: 'updateTime',
    sortOrder: 'desc',
  });
}
