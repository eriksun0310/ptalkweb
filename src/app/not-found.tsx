import Link from 'next/link';
import { FaPaw } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/appIcon.png"
            alt="PTalk"
            className="w-20 h-20 rounded-2xl"
          />
        </div>

        {/* 404 標題與可愛圖示 */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaPaw className="w-8 h-8" style={{ color: '#ffc107c8' }} />
            <h1 className="text-7xl font-bold text-gray-900">404</h1>
            <FaPaw className="w-8 h-8" style={{ color: '#ffc107c8' }} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">找不到頁面</h2>
          <p className="text-sm text-gray-600">
            抱歉，你訪問的頁面不存在
          </p>
        </div>

        {/* 按鈕組 */}
        <div className="space-y-3 mt-8">
          <Link
            href="/"
            className="block w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-full transition-colors text-sm font-semibold shadow-sm"
          >
            返回首頁
          </Link>
          <a
            href="https://ptalk.app"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white hover:bg-gray-50 text-gray-900 py-3 px-6 rounded-full border border-gray-300 transition-colors text-sm font-medium"
          >
            下載 PTalk App
          </a>
        </div>
      </div>
    </div>
  );
}
