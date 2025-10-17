import { Metadata } from 'next';
import { DownloadCTA } from '@/features/download-app/ui';
import { FaPaw } from 'react-icons/fa';
import { MapPin, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '下載 PTalk App | PTalk',
  description: '下載 PTalk，發現更多寵物友善店家',
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-5xl font-bold">P</span>
          </div>
          <h1 className="text-h1 font-bold text-text-primary mb-4">
            歡迎使用 PTalk
          </h1>
          <p className="text-body-large text-text-secondary">
            發現最適合你和毛小孩的友善店家
          </p>
        </div>

        <DownloadCTA
          title="立即下載 PTalk"
          description="加入社群，分享你的寵物友善店家體驗"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="flex justify-center mb-3">
              <FaPaw className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">真實評論</h3>
            <p className="text-body-small text-text-secondary">
              來自寵物主人的真實體驗分享
            </p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-3">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">附近探索</h3>
            <p className="text-body-small text-text-secondary">
              快速找到附近的友善店家
            </p>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-3">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">社群互動</h3>
            <p className="text-body-small text-text-secondary">
              與其他寵物主人交流心得
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
