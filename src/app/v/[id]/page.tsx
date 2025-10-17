import { Metadata } from 'next';
import { VenueDetailView } from '@/widgets/venue-detail/ui';
import { getMockVenue, getMockVenueComments } from '@/shared/lib/mockData';

type Props = {
  params: { id: string };
};

// 產生 Metadata（Open Graph）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 使用 Mock 資料
  const venue = getMockVenue(params.id);

  const title = `${venue.name} - 寵物友善店家 | PTalk`;
  const description = `查看 ${venue.name} 的 ${venue.pawCount || 0} 則評論，評分 ${venue.pawRating?.toFixed(1) || '0.0'}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(venue.mainImage && {
        images: [
          {
            url: venue.mainImage,
            width: 1200,
            height: 630,
            alt: venue.name,
          },
        ],
      }),
      type: 'website',
      url: `https://ptalk.app/v/${params.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(venue.mainImage && {
        images: [venue.mainImage],
      }),
    },
  };
}

// Server Component - 使用 Mock 資料
export default async function VenueDetailPage({ params }: Props) {
  // 使用 Mock 資料替代 API 請求
  const venue = getMockVenue(params.id);
  const commentsResponse = getMockVenueComments(params.id, 20);

  return (
    <VenueDetailView
      venue={venue}
      comments={commentsResponse.items}
      total={commentsResponse.total}
    />
  );
}
