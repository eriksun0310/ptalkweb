/** @type {import('next').NextConfig} */
const nextConfig = {
  // 圖片優化配置
  images: {
    domains: [
      'cdn.ptalk.com',
      'dev.pettalk.moushih.com',
      'images.unsplash.com',
      'i.pravatar.cc',
      'dev-ptalk.s3.ap-east-2.amazonaws.com', // AWS S3 圖片網域
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // 環境變數
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_SCHEME: process.env.NEXT_PUBLIC_APP_SCHEME,
    NEXT_PUBLIC_IOS_APP_URL: process.env.NEXT_PUBLIC_IOS_APP_URL,
    NEXT_PUBLIC_ANDROID_APP_URL: process.env.NEXT_PUBLIC_ANDROID_APP_URL,
  },

  // 啟用 React Strict Mode
  reactStrictMode: true,

  // 啟用 SWC minify
  swcMinify: true,

  // Universal Links 設定
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },

  // 輸出為 standalone（適用於 Docker 部署）
  // output: 'standalone',
};

module.exports = nextConfig;
