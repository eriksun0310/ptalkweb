// 檢舉原因類型
export enum ReportReasonType {
  IllegalContent = 1,    // 違法內容
  Harassment = 2,        // 騷擾霸凌
  Spam = 3,             // 垃圾訊息
  FalseInfo = 4,        // 虛假資訊
  Privacy = 5,          // 侵犯隱私
  Violence = 6,         // 暴力威脅
  Other = 7            // 其他
}

// 檢舉原因顯示文字映射
export const ReportReasonDisplayMap = {
  [ReportReasonType.IllegalContent]: '違法內容',
  [ReportReasonType.Harassment]: '騷擾或霸凌',
  [ReportReasonType.Spam]: '垃圾訊息',
  [ReportReasonType.FalseInfo]: '虛假資訊',
  [ReportReasonType.Privacy]: '侵犯隱私',
  [ReportReasonType.Violence]: '暴力或威脅',
  [ReportReasonType.Other]: '其他原因'
} as const;

// 檢舉原因說明映射
export const ReportReasonDescriptionMap = {
  [ReportReasonType.IllegalContent]: '包含違法活動或內容',
  [ReportReasonType.Harassment]: '針對個人或群體的騷擾、霸凌行為',
  [ReportReasonType.Spam]: '重複發送的垃圾訊息或廣告',
  [ReportReasonType.FalseInfo]: '故意誤導或虛假的資訊',
  [ReportReasonType.Privacy]: '未經同意揭露個人資訊',
  [ReportReasonType.Violence]: '包含暴力內容或威脅言論',
  [ReportReasonType.Other]: '其他違反社群規範的內容'
} as const;

// 檢舉評論請求介面
export interface ReportCommentRequest {
  commentId: string;
  reportReasonType: ReportReasonType;
  description?: string;
}

// 檢舉評論回應介面
export interface ReportCommentResponse {
  success: boolean;
  message?: string;
  reportId?: string;
}

// 檢舉使用者請求介面
export interface ReportUserRequest {
  reportedUserId: string;
  reportReasonType: ReportReasonType;
  description?: string;
}

// 檢舉使用者回應介面
export interface ReportUserResponse {
  success: boolean;
  message?: string;
  reportId?: string;
}