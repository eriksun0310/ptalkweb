// User API functions

import { get } from '@/shared/api/client';
import type { UserProfile, CommentListResponse } from '@/shared/types';

/**
 * 取得用戶資料
 * @param id - 用戶 ID
 * @returns UserProfile
 */
export async function getUser(id: string): Promise<UserProfile> {
  return get<UserProfile>(`/users/${id}`);
}

/**
 * 取得用戶評論列表
 * @param userId - 用戶 ID
 * @param limit - 限制數量（預設 10）
 * @returns CommentListResponse
 */
export async function getUserComments(
  userId: string,
  limit: number = 10
): Promise<CommentListResponse> {
  return get<CommentListResponse>(`/users/${userId}/comments`, { limit });
}
