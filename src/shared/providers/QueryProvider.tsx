'use client';

// TanStack Query Provider 設定

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * TanStack Query Provider
 * 提供全域的快取和狀態管理
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // 使用 useState 確保每個請求都有獨立的 QueryClient 實例
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 資料保持新鮮的時間（5 分鐘）
            staleTime: 5 * 60 * 1000,
            // 快取時間（10 分鐘）
            gcTime: 10 * 60 * 1000,
            // 失敗重試次數
            retry: 1,
            // 視窗重新獲得焦點時重新取得資料
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 開發環境顯示 DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
