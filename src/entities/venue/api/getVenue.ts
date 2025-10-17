// Venue API functions

import { get } from '@/shared/api/client';
import type { VenueDetail } from '@/shared/types';

/**
 * 取得店家詳細資料
 * @param id - 店家 ID
 * @returns VenueDetail
 */
export async function getVenue(id: string): Promise<VenueDetail> {
  return get<VenueDetail>(`/venues/${id}`);
}
