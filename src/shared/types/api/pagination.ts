// API 分頁參數型別定義

/**
 * 分頁請求參數
 */
export interface PaginationParams {
  /** 頁碼（從 1 開始） */
  Page: number;
  /** 每頁筆數 */
  PageSize: number;
}

/**
 * 分頁回應資料
 */
export interface PaginatedResponse<T> {
  /** 資料項目 */
  items: T[];
  /** 總筆數 */
  total: number;
}
