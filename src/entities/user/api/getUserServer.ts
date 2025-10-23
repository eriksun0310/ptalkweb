/**
 * 伺服器端專用：直接調用後端 API 獲取使用者資料
 * 用於 Server Components 和 generateMetadata
 */

import type { User, CommentListResponse } from '@/shared/types';
import { BACKEND_API_URL } from '@/shared/config';

/**
 * 伺服器端獲取使用者資料（直接調用後端 API，繞過 Next.js API Route）
 * @param id - 使用者 ID
 * @returns User
 */
export async function getUserServer(id: string): Promise<User> {
  // 使用統一配置的後端 API URL
  const apiUrl = `${BACKEND_API_URL}/user/${id}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // 確保每次都獲取最新資料
  });

  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`);
  }

  const apiResponse = await response.json();

  // 解開 API 回傳的包裝結構
  // API 回傳: { success: true, data: {...} }
  // 前端期待: {...}
  const data = apiResponse.data || apiResponse;

  // 如果 API 回傳的是 items 陣列結構，取第一個元素
  if (data.items && Array.isArray(data.items) && data.items.length > 0) {
    return data.items[0] as User;
  }

  return data as User;
}

/**
 * 伺服器端獲取使用者評論列表
 * @param userId - 使用者 ID
 * @param page - 頁碼（預設 1）
 * @param pageSize - 每頁筆數（預設 15）
 * @returns CommentListResponse
 */
export async function getUserCommentsServer(
  userId: string,
  page: number = 1,
  pageSize: number = 15
): Promise<CommentListResponse> {
  // 使用正確的 API 路徑：/comment?UserId={id}
  const apiUrl = `${BACKEND_API_URL}/comment`;

  // 建立查詢參數
  const params = new URLSearchParams({
    UserId: userId, // 注意：大寫 U
    page: page.toString(),
    pageSize: pageSize.toString(),
    sortBy: 'updateTime',
    sortOrder: 'desc',
  });

  const response = await fetch(`${apiUrl}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`);
  }

  const apiResponse = await response.json();
  const data = apiResponse.data || apiResponse;

  return data as CommentListResponse;
}
