// User type definitions - 與 React Native App 同步

import { GenderType, PartnerType } from './comment';

/**
 * 使用者個人檔案資料
 */
export interface UserProfile {
  userId: string;
  name: string;
  genderType: GenderType;
  partnerType: PartnerType;
  commentCount?: number; // 評論數量
  avatar?: string; // 頭像 URL（未來擴展用）
  bio?: string; // 個人簡介（未來擴展用）
  createTime?: string; // 註冊時間（未來擴展用）
}
