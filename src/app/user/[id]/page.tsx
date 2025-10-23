import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UserProfileView } from '@/widgets/user-profile/ui';
import { getUserServer, getUserCommentsServer } from '@/entities/user/api';
import type { User } from '@/shared/types';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';
import {
  generateProfilePageSchema,
  generateBreadcrumbSchema,
} from '@/shared/lib/seo';

interface UserPageProps {
  params: { id: string };
}

/**
 * 動態生成使用者頁面的 Metadata（包含 OG 標籤和 Canonical URL）
 */
export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  try {
    const user = await getUserServer(params.id);

    // 組合標題和描述
    const title = `${user.name} 的個人檔案`;
    const description = `查看 ${user.name} 在 PTalk 分享的寵物友善評論和體驗`;

    // 動態關鍵字
    const keywords = [
      user.name,
      'PTalk 使用者',
      '寵物評論',
      '寵物友善體驗',
      '毛小孩',
    ];

    return {
      title,
      description,
      keywords,

      // Canonical URL
      alternates: {
        canonical: `https://ptalk.app/user/${params.id}`,
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
        images: ['/images/og-default.png'], // 使用者頁面使用預設圖
        url: `https://ptalk.app/user/${params.id}`,
        siteName: 'PTalk',
        type: 'profile',
        locale: 'zh_TW',
      },

      // Twitter Card
      twitter: {
        card: 'summary',
        title,
        description,
        images: ['/images/og-default.png'],
      },
    };
  } catch (error) {
    // 如果使用者不存在，返回預設 metadata
    return {
      title: 'PTalk - 找不到使用者',
      description: '這位使用者可能不存在或已被移除',
      openGraph: {
        title: 'PTalk - 找不到使用者',
        description: '這位使用者可能不存在或已被移除',
        images: ['/images/og-default.png'],
      },
    };
  }
}

/**
 * 使用者個人檔案頁面（Server Component）
 */
export default async function UserProfilePage({ params }: UserPageProps) {
  let user: User;
  let comments: any[] = [];
  let totalCount = 0;

  try {
    // 先獲取使用者資料
    user = await getUserServer(params.id);
  } catch (error) {
    // 如果使用者不存在，顯示 404 頁面
    notFound();
  }

  try {
    // 獲取評論資料（失敗也不影響頁面顯示）
    const commentsData = await getUserCommentsServer(params.id, 1, 15);
    comments = commentsData.items || [];
    totalCount = commentsData.totalCount || 0;
  } catch (error) {
    // 評論載入失敗，使用空陣列
    comments = [];
    totalCount = 0;
  }

  // 生成結構化資料
  const profilePageSchema = generateProfilePageSchema(user);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首頁', url: '/' },
    { name: user.name },
  ]);

  // 麵包屑導航項目
  const breadcrumbItems = [
    { name: '首頁', href: '/' },
    { name: user.name },
  ];

  return (
    <>
      {/* JSON-LD 結構化資料 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
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
      <UserProfileView
        user={user}
        comments={comments}
        totalCount={totalCount}
      />
    </>
  );
}
