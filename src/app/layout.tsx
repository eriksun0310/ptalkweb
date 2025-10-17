import type { Metadata } from 'next';
import { DownloadBanner } from '@/features/download-app/ui';
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
      <body>
        <DownloadBanner />
        {children}
      </body>
    </html>
  );
}
