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
    <div className={className}>
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white text-center">
        <div className="mb-4">
          <Download className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-h3 font-bold mb-2">{title}</h3>
          <p className="text-body-small opacity-90">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {/* iOS 按鈕 */}
          <a
            href={getStoreUrl('ios')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="/images/app-store-badge.png"
              alt="Download on the App Store"
              className="h-12"
              onError={(e) => {
                // Fallback: 如果圖片不存在，使用純文字按鈕
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <Button variant="secondary" className="hidden">
              App Store
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
