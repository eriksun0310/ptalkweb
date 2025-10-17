import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-h2 font-bold text-text-primary mb-2">找不到頁面</h2>
          <p className="text-body text-text-secondary">
            抱歉，你訪問的頁面不存在
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/download" className="block">
            <Button variant="primary" size="lg" fullWidth>
              下載 PTalk App
            </Button>
          </Link>
          <Link href="/r/comment1" className="block">
            <Button variant="secondary" size="lg" fullWidth>
              查看範例評論
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
