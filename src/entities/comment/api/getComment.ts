// Comment API functions

import { get } from '@/shared/api/client';
import type { Comment, RelatedCommentsResponse } from '@/shared/types';

/**
 * 取得單則評論詳細資料
 * @param id - 評論 ID
 * @returns Comment
 */
export async function getComment(id: string): Promise<Comment> {
  return get<Comment>(`/comments/${id}`);
}

/**
 * 取得相關評論（同店家其他評論）
 * @param commentId - 評論 ID
 * @param limit - 限制數量（預設 5）
 * @returns RelatedCommentsResponse
 */
export async function getRelatedComments(
  commentId: string,
  limit: number = 5
): Promise<RelatedCommentsResponse> {
  return get<RelatedCommentsResponse>(`/comments/${commentId}/related`, { limit });
}
