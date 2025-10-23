import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VenueDetailView } from '@/widgets/venue-detail/ui';
import { getVenueServer, getVenueCommentsServer } from '@/entities/venue/api';
import type { VenueDetail } from '@/shared/types';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  getCategoryText,
} from '@/shared/lib/seo';

interface VenuePageProps {
  params: { id: string };
}

/**
 * 動態生成店家頁面的 Metadata（包含 OG 標籤和 Canonical URL）
 */
export async function generateMetadata({
  params,
}: VenuePageProps): Promise<Metadata> {
  try {
    const venue = await getVenueServer(params.id);

    // 計算平均評分（使用可選鏈運算子防止 undefined 錯誤）
    const positiveRating = venue.ratingSummary?.positive?.rating ?? 0;
    const positiveCount = venue.ratingSummary?.positive?.count ?? 0;
    const negativeRating = venue.ratingSummary?.negative?.rating ?? 0;
    const negativeCount = venue.ratingSummary?.negative?.count ?? 0;
    const totalCount = positiveCount + negativeCount;
    const averageRating = totalCount > 0
      ? ((positiveRating * positiveCount + negativeRating * negativeCount) / totalCount)
      : 0;

    // 取得第一張圖片，如果沒有則使用預設圖
    const ogImage = venue.images?.[0] || '/images/og-default.png';

    // 組合標題和描述
    const categoryText = getCategoryText(venue.categoryType);
    const title = `${venue.name} - ${categoryText}寵物友善店家`;
    const description = totalCount > 0
      ? `${venue.name} 平均評分 ${averageRating.toFixed(1)} ⭐ (${totalCount} 則評論)。${venue.address}。查看更多寵物友善資訊和真實評價。`
      : `${venue.name} - ${categoryText}寵物友善店家。${venue.address}。立即查看詳細資訊。`;

    // 動態關鍵字
    const keywords = [
      venue.name,
      categoryText,
      '寵物友善',
      `${venue.address.split(/[市區]/)[0]}寵物${categoryText}`,
      '毛小孩',
      '狗狗友善',
      '貓咪友善',
    ];

    return {
      title,
      description,
      keywords,

      // Canonical URL
      alternates: {
        canonical: `https://ptalk.app/venue/${params.id}`,
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

      // Open Graph
      openGraph: {
        title,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${venue.name} 的照片`,
          },
        ],
        url: `https://ptalk.app/venue/${params.id}`,
        siteName: 'PTalk',
        type: 'website',
        locale: 'zh_TW',
      },

      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    // 如果店家不存在，返回預設 metadata
    return {
      title: 'PTalk - 找不到店家',
      description: '這家店可能已不存在或已被移除',
      openGraph: {
        title: 'PTalk - 找不到店家',
        description: '這家店可能已不存在或已被移除',
        images: ['/images/og-default.png'],
      },
    };
  }
}

/**
 * 店家詳細頁面（Server Component）
 */
export default async function VenueDetailPage({ params }: VenuePageProps) {
  let venue: VenueDetail;
  let comments: any[] = [];
  let totalCount = 0;

  try {
    // 先獲取店家資料
    venue = await getVenueServer(params.id);
  } catch (error) {
    // 如果店家不存在，顯示 404 頁面
    console.error('店家不存在:', error);
    notFound();
  }

  try {
    // 獲取評論資料（失敗也不影響頁面顯示）
    const commentsData = await getVenueCommentsServer(params.id, 1, 20);
    comments = commentsData.items || [];
    totalCount = commentsData.totalCount || 0;
  } catch (error) {
    // 評論載入失敗，使用空陣列
    console.error('評論載入失敗:', error);
    comments = [];
    totalCount = 0;
  }

  // 生成結構化資料
  const localBusinessSchema = generateLocalBusinessSchema(venue);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首頁', url: '/' },
    { name: '店家' },
    { name: venue.name },
  ]);

  // 麵包屑導航項目
  const breadcrumbItems = [
    { name: '首頁', href: '/' },
    { name: '店家' },
    { name: venue.name },
  ];

  return (
    <>
      {/* JSON-LD 結構化資料 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* 麵包屑導航 */}
      <Breadcrumb items={breadcrumbItems} />

      {/* 渲染頁面內容 */}
      <VenueDetailView
        venue={venue}
        comments={comments}
        totalCount={totalCount}
      />
    </>
  );
}
