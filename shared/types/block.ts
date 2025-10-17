// 封鎖相關的型別定義

// 封鎖用戶請求
export interface BlockUserRequest {
  userId: string;
}

// 封鎖/解除封鎖回應
export interface BlockUserResponse {
  success: boolean;
  message?: string;
}

// 封鎖清單中的用戶資料
export interface BlockedUser {
  userId: string;
  name: string;
  genderType: number;
  partnerType: number;
}

// 封鎖清單請求參數
export interface GetBlockedUsersParams {
  page?: number;
  pageSize?: number;
}

// 封鎖清單回應
export interface GetBlockedUsersResponse {
  id: string;
  success: boolean;
  data: {
    items: BlockedUser[];
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  code: number;
  message: string;
}