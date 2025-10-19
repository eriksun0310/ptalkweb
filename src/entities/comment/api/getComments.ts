// 取得評論列表 API

import { get } from '@/shared/api/client';
import type { CommentListResponse, PaginationParams } from '@/shared/types';

/**
 * 取得評論列表（支援分頁）
 * @param params - 分頁參數 { Page, PageSize }
 * @returns CommentListResponse
 */
export async function getComments(
  params: PaginationParams
): Promise<CommentListResponse> {
  return get<CommentListResponse>('/comment', {
    Page: params.Page,
    PageSize: params.PageSize,
  });
}
