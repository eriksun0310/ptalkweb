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
          <p className="text-sm text-gray-700 mb-4">
            在 PTalk App 探索更多店家評論
          </p>
          <a
            href="https://ptalk.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-full transition-colors text-sm font-semibold"
          >
            下載 PTalk
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
