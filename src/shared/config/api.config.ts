/**
 * API 配置管理
 * 統一管理所有 API 相關的 URL 和配置
 */

/**
 * 取得後端 API 的基礎 URL
 * 用於 Next.js API Routes 和 Server Components 直接調用
 *
 * @returns 後端 API 基礎 URL (e.g., 'https://dev.api.pettalk.moushih.com/api')
 */
export function getBackendApiUrl(): string {
  // 優先使用環境變數
  if (process.env.NEXT_PUBLIC_BACKEND_API_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_API_URL;
  }

  // 根據 NODE_ENV 自動選擇
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.pettalk.moushih.com/api';
  }

  // 開發環境預設值
  return 'https://dev.api.pettalk.moushih.com/api';
}

/**
 * 取得前端調用的 API URL
 * 用於客戶端（瀏覽器）調用 Next.js API Routes
 *
 * @returns 前端 API URL (固定為 '/api')
 */
export function getFrontendApiUrl(): string {
  return '/api';
}

/**
 * API 配置物件
 */
export const apiConfig = {
  // 後端真實 API URL
  backendApiUrl: getBackendApiUrl(),

  // 前端調用的 Next.js API Route URL
  frontendApiUrl: getFrontendApiUrl(),

  // 預設 headers
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * 便利導出
 */
export const BACKEND_API_URL = apiConfig.backendApiUrl;
export const FRONTEND_API_URL = apiConfig.frontendApiUrl;
