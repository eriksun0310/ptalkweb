import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommentDetailView } from '@/widgets/comment-detail/ui';
import { getCommentServer } from '@/entities/comment/api/getCommentServer';
import type { Comment } from '@/shared/types';

interface CommentPageProps {
  params: { id: string };
}

/**
 * 動態生成評論頁面的 Metadata（包含 OG 標籤）
 */
export async function generateMetadata({
  params,
}: CommentPageProps): Promise<Metadata> {
  try {
    const comment = await getCommentServer(params.id);

    // 取得第一張圖片，如果沒有則使用預設圖
    const ogImage = comment.files?.find((f) => !f.isDeleted)?.url || '/images/og-default.png';

    // 截取評論內容前 100 字作為描述
    const description = comment.content?.substring(0, 100) || '查看完整評論內容';

    // 組合標題
    const title = `${comment.reviewer?.name || '使用者'} 在 ${comment.venue?.name || '店家'} 留下了評論`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${comment.venue?.name} 的評論圖片`,
          },
        ],
        url: `https://ptalk.app/comment/${params.id}`,
        siteName: 'PTalk',
        type: 'article',
        locale: 'zh_TW',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    // 如果評論不存在，返回預設 metadata
    return {
      title: 'PTalk - 找不到評論',
      description: '這則評論可能已被刪除或不存在',
      openGraph: {
        title: 'PTalk - 找不到評論',
        description: '這則評論可能已被刪除或不存在',
        images: ['/images/og-default.png'],
      },
    };
  }
}

/**
 * 評論詳細頁面（Server Component）
 */
export default async function CommentDetailPage({ params }: CommentPageProps) {
  let comment: Comment;

  try {
    comment = await getCommentServer(params.id);
  } catch (error) {
    // 如果評論不存在，顯示 404 頁面
    notFound();
  }

  // 暫時不顯示相關評論，等之後實作
  return (
    <CommentDetailView
      comment={comment}
      relatedComments={{ items: [], totalCount: 0, pageCount: null, currentPage: 1, pageSize: 0 }}
    />
  );
}
