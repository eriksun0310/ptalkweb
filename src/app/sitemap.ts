import { MetadataRoute } from 'next';
import { BACKEND_API_URL } from '@/shared/config';

/**
 * 動態生成 sitemap.xml
 * Next.js App Router 會自動將此檔案映射到 /sitemap.xml
 *
 * 文件：https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

const BASE_URL = 'https://ptalk.app';

/**
 * 從評論中提取所有場所和使用者 ID
 */
async function fetchAllComments(): Promise<any[]> {
  try {
    // 先獲取總數
    const firstPage = await fetch(`${BACKEND_API_URL}/comment?Page=1&PageSize=1`, {
      cache: 'no-store',
    }).then((res) => res.json());

    const totalCount = firstPage.data?.totalCount || 0;

    if (totalCount === 0) {
      return [];
    }

    // 一次獲取所有評論（最多 1000 筆）
    const pageSize = Math.min(totalCount, 1000);
    const response = await fetch(`${BACKEND_API_URL}/comment?Page=1&PageSize=${pageSize}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('獲取評論列表失敗:', response.status);
      return [];
    }

    const data = await response.json();
    return data.data?.items || [];
  } catch (error) {
    console.error('獲取評論失敗:', error);
    return [];
  }
}

/**
 * 從評論中提取唯一的場所 ID
 */
function extractVenueIds(comments: any[]): string[] {
  const venueIds = new Set<string>();
  comments.forEach((comment) => {
    if (comment.venue?.id) {
      venueIds.add(comment.venue.id);
    }
  });
  return Array.from(venueIds);
}

/**
 * 從評論中提取唯一的使用者 ID
 */
function extractUserIds(comments: any[]): string[] {
  const userIds = new Set<string>();
  comments.forEach((comment) => {
    if (comment.reviewer?.userId) {
      userIds.add(comment.reviewer.userId);
    }
  });
  return Array.from(userIds);
}

/**
 * 生成 sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. 靜態頁面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 獲取所有評論（一次性獲取，避免重複請求）
  const comments = await fetchAllComments();

  // 3. 動態評論頁面
  const commentPages: MetadataRoute.Sitemap = comments.map((comment) => ({
    url: `${BASE_URL}/comment/${comment.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. 動態場所頁面（從評論中提取）
  const venueIds = extractVenueIds(comments);
  const venuePages: MetadataRoute.Sitemap = venueIds.map((id) => ({
    url: `${BASE_URL}/venue/${id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 5. 動態使用者頁面（從評論中提取）
  const userIds = extractUserIds(comments);
  const userPages: MetadataRoute.Sitemap = userIds.map((id) => ({
    url: `${BASE_URL}/user/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 合併所有頁面
  const allPages = [
    ...staticPages,
    ...commentPages,
    ...venuePages,
    ...userPages,
  ];

  console.log(`✅ 生成 sitemap: ${allPages.length} 個頁面`);
  console.log(`   - 靜態頁面: ${staticPages.length}`);
  console.log(`   - 評論頁面: ${commentPages.length}`);
  console.log(`   - 場所頁面: ${venuePages.length}`);
  console.log(`   - 使用者頁面: ${userPages.length}`);

  return allPages;
}
