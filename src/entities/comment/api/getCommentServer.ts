/**
 * 伺服器端專用：直接調用後端 API 獲取評論資料
 * 用於 Server Components 和 generateMetadata
 */

import type { Comment } from '@/shared/types';
import { BACKEND_API_URL } from '@/shared/config';

/**
 * 伺服器端獲取單則評論（直接調用後端 API，繞過 Next.js API Route）
 * @param id - 評論 ID
 * @returns Comment
 */
export async function getCommentServer(id: string): Promise<Comment> {
  // 使用統一配置的後端 API URL
  const apiUrl = `${BACKEND_API_URL}/comment/${id}`;

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

  return data as Comment;
}
