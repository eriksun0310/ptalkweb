import { Metadata } from 'next';
import { CommentCard } from '@/entities/comment/ui';
import { mockComments } from '@/shared/lib/mockData';

export const metadata: Metadata = {
  title: 'PTalk - 發現寵物友善店家 | 真實評論分享平台',
  description: '來自寵物主人的真實體驗分享，快速找到附近的友善店家，與其他寵物主人交流心得',
};

export default function HomePage() {
  // 取得精選評論（前5則）
  const featuredComments = mockComments.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="max-w-[600px] mx-auto bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
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
      <div>
        {/* Comments List */}
        <div>
          {featuredComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} variant="preview" />
          ))}
        </div>

        {/* App Download CTA - 簡潔版 */}
        <div className="py-8 px-4 text-center">
          <p className="text-sm text-gray-600 mb-3">
            在 PTalk App 探索更多店家評論
          </p>
          <a
            href="https://ptalk.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-full transition-colors text-sm font-semibold"
          >
            下載 PTalk
          </a>
        </div>
      </div>
    </div>
  );
}
