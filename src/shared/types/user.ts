// User type definitions - 與 React Native App 同步

import { GenderType, PartnerType, PetType, NeuteredType, GrowthStatus } from './comment';

/**
 * 寵物資訊（與 API 一致）
 */
export interface UserPetInfo {
  name: string;
  petType: PetType;
  breed: string;
  genderType: GenderType;
  neuteredType: NeuteredType;
  growthStatus: GrowthStatus;
}

/**
 * 使用者完整資料（完全符合後端 API 回應）
 * GET /api/user/{id}
 */
export interface User {
  id: string;
  name: string;
  email: string;
  genderType: GenderType;
  partnerType: PartnerType;
  mapWarningIconType: number;
  status: number;
  appPushToken?: string;
  petInfo: UserPetInfo;
}

/**
 * 使用者個人檔案資料（簡化版，用於評論中的 reviewer）
 * 來自 Comment API 中的 reviewer 欄位
 */
export interface UserProfile {
  userId: string;
  name: string;
  genderType: GenderType;
  partnerType: PartnerType;
}
