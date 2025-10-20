'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { detectDevice, getStoreUrl, type DeviceType } from '@/shared/lib/deeplink';

export interface AppHeaderProps {
  /** 是否顯示返回按鈕（自動判斷，也可手動覆寫） */
  showBack?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ showBack }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  // 自動判斷是否顯示返回按鈕
  const shouldShowBack = showBack ?? !isHomePage;

  const handleBack = () => {
    // 智能返回邏輯
    if (typeof window !== 'undefined' && window.history.length > 1) {
      // 有歷史記錄，返回上一頁
      router.back();
    } else {
      // 無歷史記錄（從分享連結直接進入），返回首頁
      router.push('/');
    }
  };

  // 根據設備類型決定按鈕文字和行為
  const getDownloadButton = () => {
    if (device === 'ios') {
      return (
        <a
          href={getStoreUrl('ios')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
        >
          下載 App
        </a>
      );
    } else if (device === 'android') {
      return (
        <span className="text-sm text-gray-400 font-medium cursor-not-allowed">
          即將推出
        </span>
      );
    } else {
      // 桌面版
      return (
        <a
          href={getStoreUrl('desktop')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
        >
          iOS 版下載
        </a>
      );
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-gray-50">
      <div className="max-w-[600px] mx-auto bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        {/* 左側：返回按鈕 + Logo */}
        <div className="flex items-center gap-2 flex-1">
          {shouldShowBack && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="返回"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/appIcon.png"
              alt="PTalk"
              className="w-8 h-8 rounded-lg"
            />
            <h1 className="text-lg font-bold text-gray-900">PTalk</h1>
          </Link>
        </div>

        {/* 右側：下載 App 連結 */}
        {getDownloadButton()}
      </div>
    </div>
  );
};
