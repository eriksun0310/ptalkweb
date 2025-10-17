'use client';

import React, { useEffect, useState } from 'react';
import { detectDevice, openApp } from '@/shared/lib/deeplink';
import { Button } from '@/shared/ui/Button';

export const DownloadBanner: React.FC = () => {
  const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const handleOpenApp = () => {
    openApp();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo 和文字 */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/images/appIcon.png"
            alt="PTalk App Icon"
            className="w-10 h-10 rounded-lg flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-body-small font-semibold text-text-primary truncate">PTalk</p>
            <p className="text-caption text-text-secondary truncate">
              在 App 中獲得更好體驗
            </p>
          </div>
        </div>

        {/* 按鈕組 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="primary" size="sm" onClick={handleOpenApp}>
            開啟
          </Button>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary p-1 text-xl leading-none"
            aria-label="關閉"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};
