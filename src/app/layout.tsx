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
  metadataBase: new URL('https://ptalk.app'),
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PTalk - 寵物友善地圖',
    description: '發現最適合你和毛小孩的友善店家',
    images: ['/images/og-default.png'],
  },
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
