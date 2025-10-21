// FilterSheet 型別定義

import { FeedbackType, PetFriendlyLevel, CategoryType } from '@/shared/types';

export interface FilterState {
  /** 評價類型篩選（null = 全部） */
  feedbackType: FeedbackType | null;
  /** 寵物友善程度篩選（null = 全部） */
  petFriendlyLevel: PetFriendlyLevel | null;
}

export interface FilterSheetProps {
  /** 是否顯示篩選面板 */
  isOpen: boolean;
  /** 當前篩選狀態 */
  filters: FilterState;
  /** 店家類型（決定是否顯示寵物友善篩選） */
  categoryType?: CategoryType;
  /** 關閉面板的回調 */
  onClose: () => void;
  /** 套用篩選的回調 */
  onApply: (filters: FilterState) => void;
}
