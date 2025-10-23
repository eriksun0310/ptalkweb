import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

/**
 * 首頁專屬 Metadata（SEO 優化）
 */
export const metadata: Metadata = {
  title: 'PTalk - 寵物友善地圖 | 探索最適合毛小孩的友善店家',
  description: '瀏覽最新的寵物友善店家評論，包含餐廳、咖啡廳、旅館、公園等。查看真實評價，發現最適合你和毛小孩的友善場所。立即探索 PTalk 寵物友善地圖！',

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
    '寵物友善店家',
    '寵物體驗分享',
  ],

  openGraph: {
    title: 'PTalk - 寵物友善地圖 | 最新評論',
    description: '瀏覽最新的寵物友善店家評論，查看真實評價，發現最適合你和毛小孩的友善場所',
    url: 'https://ptalk.app',
    siteName: 'PTalk',
    type: 'website',
    locale: 'zh_TW',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'PTalk - 寵物友善地圖',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PTalk - 寵物友善地圖 | 最新評論',
    description: '瀏覽最新的寵物友善店家評論，發現最適合毛小孩的友善場所',
    images: ['/images/og-default.png'],
  },

  alternates: {
    canonical: 'https://ptalk.app',
  },
};

/**
 * 首頁（Server Component）
 */
export default function HomePage() {
  // WebSite 結構化資料
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PTalk',
    url: 'https://ptalk.app',
    description: '寵物友善地圖 - 探索最適合毛小孩的友善店家',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ptalk.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PTalk',
      url: 'https://ptalk.app',
    },
  };

  // ItemList 結構化資料（評論列表）
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '最新寵物友善店家評論',
    description: '瀏覽最新的寵物友善店家評論和體驗分享',
    url: 'https://ptalk.app',
  };

  return (
    <>
      {/* JSON-LD 結構化資料 - WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* JSON-LD 結構化資料 - ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      {/* 渲染 Client Component */}
      <HomePageClient />
    </>
  );
}
