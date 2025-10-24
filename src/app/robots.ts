import { MetadataRoute } from 'next';

/**
 * 動態生成 robots.txt
 * Next.js App Router 會自動將此檔案映射到 /robots.txt
 *
 * 文件：https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // API 路由不需要被索引
          '/_next/',      // Next.js 內部檔案
          '/private/',    // 私有頁面（如果有）
        ],
      },
      {
        userAgent: 'GPTBot',  // OpenAI 爬蟲
        disallow: '/',        // 禁止 AI 爬取內容
      },
      {
        userAgent: 'ChatGPT-User',  // ChatGPT 使用者代理
        disallow: '/',              // 禁止 AI 爬取內容
      },
    ],
    sitemap: 'https://ptalk.app/sitemap.xml',
  };
}
