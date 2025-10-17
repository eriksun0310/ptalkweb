import { Metadata } from 'next';
import { DownloadCTA } from '@/features/download-app/ui';
import { CommentCard } from '@/entities/comment/ui';
import { mockComments } from '@/shared/lib/mockData';
import { FaPaw } from 'react-icons/fa';
import { MapPin, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PTalk - 發現寵物友善店家 | 真實評論分享平台',
  description: '來自寵物主人的真實體驗分享，快速找到附近的友善店家，與其他寵物主人交流心得',
};

export default function HomePage() {
  // 取得精選評論（前5則）
  const featuredComments = mockComments.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/appIcon.png"
              alt="PTalk"
              className="w-9 h-9 rounded-xl"
            />
            <h1 className="text-lg font-bold text-gray-900">PTalk</h1>
          </div>
          <a
            href="https://ptalk.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary font-medium"
          >
            下載 App
          </a>
        </div>
      </div>

      {/* Featured Comments Section */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">精選評論</h2>
        </div>

        {/* Comments List */}
        <div className="space-y-4 mb-8">
          {featuredComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} variant="preview" />
          ))}
        </div>

        {/* App Download Banner */}
        <div className="border-t border-b border-gray-200 py-4 -mx-4 px-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <img
              src="/images/appIcon.png"
              alt="PTalk App Icon"
              className="w-14 h-14 rounded-2xl"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 mb-0.5">
                想看完整內容？
              </h3>
              <p className="text-xs text-gray-600">
                在 PTalk App 探索更多店家
              </p>
            </div>
            <a
              href="https://ptalk.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full transition-colors text-sm font-semibold whitespace-nowrap"
            >
              下載
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
