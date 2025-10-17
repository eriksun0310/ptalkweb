import { Metadata } from 'next';
import { CommentDetailView } from '@/widgets/comment-detail/ui';
import { getMockComment, getMockRelatedComments } from '@/shared/lib/mockData';

type Props = {
  params: { id: string };
};

// 產生 Metadata（Open Graph）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 使用 Mock 資料
  const comment = getMockComment(params.id);

  const title = `${comment.reviewer.name} 在 ${comment.venue.name} 的評價 | PTalk`;
  const description = comment.content.substring(0, 100) + (comment.content.length > 100 ? '...' : '');
  const imageUrl = comment.files[0]?.url || comment.venue.mainImage || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${comment.reviewer.name} 在 ${comment.venue.name} 的評價`,
        },
      ],
      type: 'article',
      url: `https://ptalk.app/r/${params.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Server Component - 使用 Mock 資料
export default async function CommentDetailPage({ params }: Props) {
  // 使用 Mock 資料替代 API 請求
  const comment = getMockComment(params.id);
  const relatedComments = getMockRelatedComments(params.id, 5);

  return <CommentDetailView comment={comment} relatedComments={relatedComments} />;
}
