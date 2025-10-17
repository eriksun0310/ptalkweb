'use client';

import React, { useEffect, useState } from 'react';
import { detectDevice, getStoreUrl } from '@/shared/lib/deeplink';
import { Button } from '@/shared/ui/Button';
import { Download } from 'lucide-react';

export interface DownloadCTAProps {
  title?: string;
  description?: string;
  className?: string;
}

export const DownloadCTA: React.FC<DownloadCTAProps> = ({
  title = '發現更多寵物友善店家',
  description = '下載 PTalk App，探索更多評論和推薦',
  className,
}) => {
  const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const handleDownload = () => {
    window.location.href = getStoreUrl(device);
  };

  return (
    <a
      href={getStoreUrl(device)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Download className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">
              在 App 中查看完整內容
            </span>
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0">→</span>
        </div>
      </div>
    </a>
  );
};
