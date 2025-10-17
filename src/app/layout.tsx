import type { Metadata } from 'next';
import { AppHeader } from '@/shared/ui/AppHeader';
import { Footer } from '@/shared/ui/Footer';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'PTalk - 寵物友善店家評論',
  description: '發現最適合你和毛小孩的友善店家',
  metadataBase: new URL('https://ptalk.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <AppHeader />
        <main className="flex-1 w-full max-w-[600px] mx-auto bg-white min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
