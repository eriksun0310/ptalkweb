import { FeedbackTypeAll } from './user';

/**
 * 地圖搜尋模式類型
 */
export type SearchModeType = 'marker' | 'current' | 'area';

/**
 * 地圖篩選條件介面
 */
export interface MapFilters {
  radius: number;
  categoryType: number; // BusinessCategoryOption
  city: string;
  district: string;
  searchMode: SearchModeType | undefined;
  feedbackType: FeedbackTypeAll;
}

/**
 * 搜尋模式選項的型別定義（內部使用）
 */
export interface SearchModeOption {
  id: SearchModeType;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}