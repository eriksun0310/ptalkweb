import { redirect } from 'next/navigation';

export default function HomePage() {
  // 首頁重定向到下載頁面
  redirect('/download');
}
