import type { Metadata } from 'next';
import { AppHeader } from '@/shared/ui/AppHeader';
import { Footer } from '@/shared/ui/Footer';
import { QueryProvider } from '@/shared/providers';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PTalk - 寵物友善地圖',
    template: '%s | PTalk',
  },
  description: '發現最適合你和毛小孩的友善店家，查看真實評價，分享你的寵物體驗',

  // 關鍵字
  keywords: [
    '寵物友善',
    '寵物地圖',
    '寵物餐廳',
    '寵物咖啡廳',
    '毛小孩',
    '狗狗友善',
    '貓咪友善',
    '寵物評論',
    '寵物旅館',
    '寵物公園',
    'PTalk',
  ],

  // 作者和創作者資訊
  authors: [{ name: 'PTalk' }],
  creator: 'PTalk',
  publisher: 'PTalk',

  // Base URL
  metadataBase: new URL('https://ptalk.app'),

  // Canonical URL（首頁）
  alternates: {
    canonical: 'https://ptalk.app',
  },

  // Robots 設定
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 格式偵測
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph
  openGraph: {
    title: 'PTalk - 寵物友善地圖',
    description: '發現最適合你和毛小孩的友善店家，查看真實評價，分享你的寵物體驗',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'PTalk - 寵物友善地圖',
      },
    ],
    siteName: 'PTalk',
    type: 'website',
    locale: 'zh_TW',
    url: 'https://ptalk.app',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'PTalk - 寵物友善地圖',
    description: '發現最適合你和毛小孩的友善店家',
    images: ['/images/og-default.png'],
  },

  // App 相關設定
  appleWebApp: {
    capable: true,
    title: 'PTalk',
    statusBarStyle: 'default',
  },

  // 其他 meta 標籤
  other: {
    'mobile-web-app-capable': 'yes',
  },

  // 未來可加入 Google Search Console 驗證
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <QueryProvider>
          <AppHeader />
          <main className="flex-1 w-full max-w-[600px] mx-auto bg-white min-h-screen">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
