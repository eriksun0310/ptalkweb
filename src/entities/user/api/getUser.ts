// User API functions

import { get } from '@/shared/api/client';
import type { User, CommentListResponse } from '@/shared/types';

/**
 * 取得使用者資料
 * @param id - 使用者 ID
 * @returns User
 */
export async function getUser(id: string): Promise<User> {
  return get<User>(`/user/${id}`);
}

/**
 * 取得使用者評論列表
 * @param userId - 使用者 ID
 * @param page - 頁碼（預設 1）
 * @param pageSize - 每頁筆數（預設 15）
 * @returns CommentListResponse
 */
export async function getUserComments(
  userId: string,
  page: number = 1,
  pageSize: number = 15
): Promise<CommentListResponse> {
  return get<CommentListResponse>(`/user/${userId}/comments`, {
    page,
    pageSize,
    sortBy: 'updateTime',
    sortOrder: 'desc',
  });
}
