# PTalk 網頁版 MVP 完整計劃書

> 極簡版網頁 - 分享引流專案
> 技術棧: React + TypeScript + Next.js 14 + Feature-Sliced Design

---

## 📋 目錄

1. [專案概述](#專案概述)
2. [設計系統](#設計系統)
3. [技術架構](#技術架構)
4. [功能規格](#功能規格)
5. [專案結構](#專案結構)
6. [開發階段](#開發階段)
7. [API 規格](#api-規格)
8. [部署計劃](#部署計劃)
9. [檢查清單](#檢查清單)

---

## 📖 專案概述

### 目標
打造一個極簡版的 PTalk 網頁預覽平台，讓未下載 App 的用戶能夠查看分享的評論內容，並引導下載 App。

### 核心價值主張
- ✅ 完整顯示單則評論（建立信任）
- ✅ 精選其他評論（展現社群活躍度）
- ✅ 限制內容數量（製造下載動機）
- ✅ 清晰的 CTA（引導下載）

### 技術選型理由
- **Next.js 14**: App Router + Server Components（SEO 優化、效能最佳）
- **TypeScript**: 型別安全、與 App 共用型別定義
- **Feature-Sliced Design**: 可擴展、易維護的架構
- **TailwindCSS**: 快速開發、與設計系統完美整合

---

## 🎨 設計系統

### 顏色定義

從 App 的 `constants/style.tsx` 同步：

```typescript
// styles/colors.ts
export const Colors = {
  // 主要顏色
  primary: '#2196F3',       // blueText - 主要按鈕、連結
  text: '#374151',          // 主要文字
  textSecondary: '#737373', // greyText - 次要文字
  textLight: '#a7a7a7',     // 更多文字提示

  // 背景顏色
  background: '#f5f5f5',    // backgroundGrey
  surface: '#ffffff',       // 卡片背景
  border: '#e8dedd',        // borderGrey

  // 評分顏色
  paw: '#ffc107c8',         // 抓抓評分
  pawLight: '#fff4d1',      // 抓抓背景
  poop: '#8B5E3C',          // 便便評分
  poopLight: '#d9b8a3',     // 便便背景

  // 狀態顏色
  success: '#008000da',     // greenText
  danger: '#DC2626',        // 危險操作
  error: '#F87171',         // redText
  disabled: '#D3D3D3',      // disabledText

  // Logo 顏色
  logo: '#646A6F',
} as const;
```

### 圓角系統

```typescript
// styles/radius.ts
export const BorderRadius = {
  xs: '4px',   // 小圓角 - 標籤
  sm: '6px',   // 小圓角 - 評分顯示
  md: '8px',   // 中圓角 - 輸入框
  lg: '12px',  // 大圓角 - 圖片容器
  xl: '16px',  // 特大圓角 - 主要卡片
  xxl: '20px', // 超大圓角 - 頭像
  full: '9999px', // 圓形
} as const;
```

### 間距系統

```typescript
// styles/spacing.ts
export const Spacing = {
  xs: '4px',    // 極小間距
  sm: '8px',    // 小間距
  md: '12px',   // 中間距
  lg: '16px',   // 大間距
  xl: '20px',   // 特大間距
  xxl: '24px',  // 超大間距
  xxxl: '32px', // 極大間距
} as const;
```

### 陰影系統

```typescript
// styles/shadows.ts
export const Shadow = {
  light: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  medium: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
  heavy: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
} as const;
```

### 字體系統

```typescript
// styles/typography.ts
export const Typography = {
  // 標題
  h1: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h2: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h3: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1.4,
  },

  // 內文
  body: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  bodyLarge: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  bodySmall: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
  },

  // 其他
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
  },
  button: {
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: 1,
  },
} as const;
```

### TailwindCSS 配置

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2196F3',
        'text-primary': '#374151',
        'text-secondary': '#737373',
        'text-light': '#a7a7a7',
        background: '#f5f5f5',
        surface: '#ffffff',
        border: '#e8dedd',
        paw: '#ffc107c8',
        'paw-light': '#fff4d1',
        poop: '#8B5E3C',
        'poop-light': '#d9b8a3',
        success: '#008000da',
        danger: '#DC2626',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '20px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
        xxxl: '32px',
      },
      boxShadow: {
        light: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        heavy: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
```

---

## 🏗️ 技術架構

### 技術棧

```yaml
核心框架:
  - Next.js: 14.2.x (App Router)
  - React: 18.3.x
  - TypeScript: 5.5.x

樣式:
  - TailwindCSS: 3.4.x
  - clsx: 用於條件樣式

狀態管理:
  - SWR: 資料獲取與快取（輕量、適合 SSR）

圖片處理:
  - next/image: 自動優化、懶載入

工具:
  - ESLint: 程式碼檢查
  - Prettier: 格式化
  - TypeScript: 型別檢查
```

### Feature-Sliced Design 架構

```
ptalk-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root Layout
│   │   ├── page.tsx           # 首頁（重定向到下載頁）
│   │   ├── r/                 # 評論路由
│   │   │   └── [id]/
│   │   │       └── page.tsx   # 評論詳細頁
│   │   ├── u/                 # 用戶路由
│   │   │   └── [id]/
│   │   │       └── page.tsx   # 用戶檔案頁
│   │   └── download/          # 下載頁
│   │       └── page.tsx
│   │
│   ├── shared/                 # 共享層（最底層）
│   │   ├── api/               # API 客戶端
│   │   │   ├── client.ts      # Fetch 配置
│   │   │   └── endpoints.ts   # API 端點
│   │   ├── config/            # 配置
│   │   │   └── constants.ts   # 常數定義
│   │   ├── lib/               # 工具函數
│   │   │   ├── utils.ts       # 通用工具
│   │   │   └── deeplink.ts    # Deep Link 處理
│   │   ├── types/             # 型別定義（從 App 同步）
│   │   │   ├── comment.ts
│   │   │   ├── venue.ts
│   │   │   └── user.ts
│   │   └── ui/                # 基礎 UI 元件
│   │       ├── Button/
│   │       ├── Image/
│   │       └── Typography/
│   │
│   ├── entities/               # 實體層（領域模型）
│   │   ├── comment/
│   │   │   ├── ui/            # Comment 相關 UI
│   │   │   │   ├── CommentCard.tsx
│   │   │   │   ├── CommentImages.tsx
│   │   │   │   └── RatingDisplay.tsx
│   │   │   ├── model/         # 資料邏輯
│   │   │   │   └── useComment.ts
│   │   │   └── api/           # API 請求
│   │   │       └── getComment.ts
│   │   │
│   │   ├── venue/
│   │   │   ├── ui/
│   │   │   │   ├── VenueInfo.tsx
│   │   │   │   └── VenueAddress.tsx
│   │   │   └── api/
│   │   │       └── getVenue.ts
│   │   │
│   │   └── user/
│   │       ├── ui/
│   │       │   ├── UserAvatar.tsx
│   │       │   └── UserProfile.tsx
│   │       └── api/
│   │           └── getUser.ts
│   │
│   ├── features/               # 功能層（業務邏輯）
│   │   ├── download-app/
│   │   │   └── ui/
│   │   │       ├── DownloadBanner.tsx    # 頂部浮動按鈕
│   │   │       ├── DownloadCTA.tsx       # 底部 CTA
│   │   │       └── DownloadButton.tsx    # 通用下載按鈕
│   │   │
│   │   └── share-preview/
│   │       └── ui/
│   │           └── ShareMetaTags.tsx     # Open Graph
│   │
│   └── widgets/                # 組件層（組合多個 entities）
│       ├── comment-detail/
│       │   └── ui/
│       │       ├── CommentDetailView.tsx  # 評論詳細頁主體
│       │       └── RelatedComments.tsx    # 其他評論列表
│       │
│       └── user-profile/
│           └── ui/
│               └── UserProfileView.tsx    # 用戶檔案頁主體
│
├── public/                     # 靜態資源
│   ├── images/
│   │   ├── logo.png
│   │   ├── app-store-badge.png
│   │   └── google-play-badge.png
│   └── favicon.ico
│
├── styles/                     # 全域樣式
│   ├── globals.css
│   ├── colors.ts              # 顏色系統
│   ├── spacing.ts             # 間距系統
│   ├── radius.ts              # 圓角系統
│   └── typography.ts          # 字體系統
│
├── .env.local                  # 環境變數
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

---

## 📱 功能規格

### 頁面 1: 評論詳細頁

**路由**: `/r/[id]`

**功能描述**:
- 完整顯示該則評論
- 顯示店家基本資訊
- 顯示 3-5 則精選評論
- 多個下載 CTA

**API 需求**:
```typescript
GET /api/comments/:id
Response: {
  id: string;
  content: string;
  rating: number;
  images: string[];
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  venue: {
    id: string;
    name: string;
    address: string;
    rating: number;
    reviewCount: number;
    mainImage: string;
  };
}

GET /api/comments/:id/related?limit=5
Response: {
  comments: Comment[];
  total: number;
}
```

**UI 組成**:
```
┌─────────────────────────────────────┐
│ [固定] DownloadBanner               │ ← 頂部浮動
├─────────────────────────────────────┤
│                                     │
│ VenueInfo                           │ ← 店家資訊卡
│  - 店名、評分、地址                   │
│                                     │
│ CommentCard (完整)                   │ ← 該則評論
│  - UserAvatar + 名稱                │
│  - RatingDisplay                    │
│  - 完整文字內容                       │
│  - CommentImages                    │
│                                     │
│ [插入] DownloadCTA                   │ ← 中間 CTA
│  - 「發現更多寵物友善店家」            │
│                                     │
│ RelatedComments                     │ ← 其他評論
│  - 標題: 「其他人怎麼說 (共 50 則)」   │
│  - 精選 3-5 則評論預覽               │
│  - [查看全部] → 提示下載              │
│                                     │
│ [底部] DownloadCTA                   │ ← 底部 CTA
│  - App Store / Google Play 按鈕     │
│                                     │
└─────────────────────────────────────┘
```

**Server Component**:
```typescript
// app/r/[id]/page.tsx
import { Metadata } from 'next';
import { getComment, getRelatedComments } from '@/entities/comment/api';
import { CommentDetailView } from '@/widgets/comment-detail';

type Props = {
  params: { id: string };
};

// Open Graph Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comment = await getComment(params.id);

  return {
    title: `${comment.user.name} 在 ${comment.venue.name} 的評價 | PTalk`,
    description: comment.content.substring(0, 100),
    openGraph: {
      title: `${comment.user.name} 在 ${comment.venue.name} 的評價`,
      description: comment.content.substring(0, 100),
      images: [comment.images[0] || comment.venue.mainImage],
      url: `https://ptalk.app/r/${params.id}`,
    },
  };
}

// Server Component
export default async function CommentDetailPage({ params }: Props) {
  const [comment, relatedComments] = await Promise.all([
    getComment(params.id),
    getRelatedComments(params.id, 5),
  ]);

  return (
    <CommentDetailView
      comment={comment}
      relatedComments={relatedComments}
    />
  );
}
```

---

### 頁面 2: 用戶檔案頁

**路由**: `/u/[id]`

**功能描述**:
- 顯示用戶基本資訊
- 顯示最近 5-10 則評論
- 提示「在 App 查看全部評論」

**API 需求**:
```typescript
GET /api/users/:id
Response: {
  id: string;
  name: string;
  avatar: string;
  commentCount: number;
}

GET /api/users/:id/comments?limit=10
Response: {
  comments: Comment[];
  total: number;
}
```

**UI 組成**:
```
┌─────────────────────────────────────┐
│ [固定] DownloadBanner               │
├─────────────────────────────────────┤
│                                     │
│ UserProfile                         │
│  - 頭像（大）                        │
│  - 用戶名稱                          │
│  - 已發表 23 則評論                  │
│                                     │
│ [分隔線]                            │
│                                     │
│ 評論列表 (5-10 則)                   │
│  CommentCard (預覽版)                │
│  CommentCard (預覽版)                │
│  CommentCard (預覽版)                │
│  ...                                │
│                                     │
│ [查看全部 XX 則評論]                 │
│  ↓ 點擊提示下載                      │
│                                     │
│ [底部] DownloadCTA                   │
│                                     │
└─────────────────────────────────────┘
```

**Server Component**:
```typescript
// app/u/[id]/page.tsx
import { Metadata } from 'next';
import { getUser, getUserComments } from '@/entities/user/api';
import { UserProfileView } from '@/widgets/user-profile';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUser(params.id);

  return {
    title: `${user.name} 的評論 | PTalk`,
    description: `查看 ${user.name} 的 ${user.commentCount} 則寵物友善店家評論`,
    openGraph: {
      title: `${user.name} 的評論`,
      description: `已發表 ${user.commentCount} 則評論`,
      images: [user.avatar],
    },
  };
}

export default async function UserProfilePage({ params }: Props) {
  const [user, comments] = await Promise.all([
    getUser(params.id),
    getUserComments(params.id, 10),
  ]);

  return (
    <UserProfileView
      user={user}
      comments={comments}
    />
  );
}
```

---

### 共用組件

#### 1. DownloadBanner (頂部浮動)

```typescript
// src/features/download-app/ui/DownloadBanner.tsx
'use client';

import { useEffect, useState } from 'react';
import { detectDevice, openApp } from '@/shared/lib/deeplink';

export const DownloadBanner = () => {
  const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const handleOpenApp = () => {
    openApp();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="PTalk" className="w-10 h-10" />
          <div>
            <p className="text-sm font-semibold text-text-primary">PTalk</p>
            <p className="text-xs text-text-secondary">在 App 中獲得更好體驗</p>
          </div>
        </div>

        <button
          onClick={handleOpenApp}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
        >
          開啟 App
        </button>
      </div>
    </div>
  );
};
```

#### 2. CommentCard

```typescript
// src/entities/comment/ui/CommentCard.tsx
import { Comment } from '@/shared/types';
import { UserAvatar } from '@/entities/user/ui';
import { RatingDisplay } from './RatingDisplay';
import { CommentImages } from './CommentImages';

interface CommentCardProps {
  comment: Comment;
  variant?: 'full' | 'preview';
}

export const CommentCard = ({ comment, variant = 'full' }: CommentCardProps) => {
  const { user, content, rating, images, createdAt } = comment;
  const isPreview = variant === 'preview';

  // 預覽模式：截斷文字
  const displayContent = isPreview && content.length > 100
    ? `${content.substring(0, 100)}...`
    : content;

  return (
    <div className="bg-surface rounded-xl p-4 shadow-md border border-border">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <UserAvatar user={user} size="md" />
        <div>
          <p className="font-semibold text-text-primary">{user.name}</p>
          <p className="text-xs text-text-secondary">
            {new Date(createdAt).toLocaleDateString('zh-TW')}
          </p>
        </div>
      </div>

      {/* Rating */}
      <RatingDisplay rating={rating} />

      {/* Content */}
      <p className="text-body text-text-primary mt-3 leading-relaxed">
        {displayContent}
      </p>

      {/* Images */}
      {images && images.length > 0 && (
        <CommentImages
          images={isPreview ? images.slice(0, 3) : images}
        />
      )}

      {/* Preview Mode: 查看完整評論 */}
      {isPreview && (
        <a
          href={`/r/${comment.id}`}
          className="inline-block mt-3 text-primary text-sm font-semibold"
        >
          查看完整評論 →
        </a>
      )}
    </div>
  );
};
```

#### 3. Deep Link 處理

```typescript
// src/shared/lib/deeplink.ts

export const detectDevice = (): 'ios' | 'android' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  }

  return 'desktop';
};

export const openApp = (path?: string) => {
  const device = detectDevice();
  const appScheme = 'ptalk://'; // 你的 App URL Scheme
  const fullPath = path ? `${appScheme}${path}` : appScheme;

  // 嘗試開啟 App
  window.location.href = fullPath;

  // 如果 2 秒後還在網頁，表示沒有安裝 App，導向商店
  setTimeout(() => {
    if (document.hidden) return; // App 已開啟

    if (device === 'ios') {
      window.location.href = 'https://apps.apple.com/app/ptalk/id...';
    } else if (device === 'android') {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.ptalk';
    }
  }, 2000);
};

export const getStoreUrl = (device: 'ios' | 'android' | 'desktop') => {
  if (device === 'ios') {
    return 'https://apps.apple.com/app/ptalk/id...';
  } else if (device === 'android') {
    return 'https://play.google.com/store/apps/details?id=com.ptalk';
  }
  return '/download'; // 電腦版導向下載頁
};
```

---

## 📦 開發階段

### 階段 1: 環境建置（1 天）

**任務**:
- ✅ 初始化 Next.js 14 專案
- ✅ 設定 TypeScript + ESLint + Prettier
- ✅ 安裝 TailwindCSS
- ✅ 建立基礎專案結構（FSD）
- ✅ 設定環境變數

**指令**:
```bash
# 1. 建立 Next.js 專案
npx create-next-app@latest ptalk-web --typescript --tailwind --app --no-src-dir

# 2. 進入專案目錄
cd ptalk-web

# 3. 安裝額外依賴
pnpm add clsx swr

# 4. 安裝開發依賴
pnpm add -D @types/node prettier

# 5. 建立專案結構
mkdir -p src/{shared,entities,features,widgets}/{api,ui,lib,types,config}
```

**環境變數**:
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://dev.pettalk.moushih.com/api
NEXT_PUBLIC_APP_SCHEME=ptalk://
NEXT_PUBLIC_IOS_APP_URL=https://apps.apple.com/app/ptalk/id...
NEXT_PUBLIC_ANDROID_APP_URL=https://play.google.com/store/apps/details?id=com.ptalk
```

---

### 階段 2: 設計系統實作（1 天）

**任務**:
- ✅ 設定 Tailwind 配置（顏色、間距、圓角）
- ✅ 建立基礎 UI 元件（Button, Image, Typography）
- ✅ 建立樣式常數檔案
- ✅ 測試設計系統

**檢查清單**:
- [ ] `tailwind.config.js` 配置完成
- [ ] `styles/colors.ts` 建立
- [ ] `styles/spacing.ts` 建立
- [ ] `styles/radius.ts` 建立
- [ ] `shared/ui/Button` 元件完成
- [ ] `shared/ui/Image` 元件完成
- [ ] Storybook（可選）建立

---

### 階段 3: API 整合（1 天）

**任務**:
- ✅ 建立 API Client（fetch wrapper）
- ✅ 定義 API 端點
- ✅ 建立型別定義（從 App 同步）
- ✅ 實作 API 函數

**檔案**:
```typescript
// src/shared/api/client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
```

```typescript
// src/entities/comment/api/getComment.ts
import { fetchAPI } from '@/shared/api/client';
import { Comment } from '@/shared/types';

export async function getComment(id: string): Promise<Comment> {
  return fetchAPI(`/comments/${id}`);
}

export async function getRelatedComments(
  commentId: string,
  limit: number = 5
): Promise<{ comments: Comment[]; total: number }> {
  return fetchAPI(`/comments/${commentId}/related?limit=${limit}`);
}
```

**檢查清單**:
- [ ] API Client 建立
- [ ] Comment API 完成
- [ ] User API 完成
- [ ] Venue API 完成
- [ ] 型別定義完整

---

### 階段 4: 核心元件開發（2 天）

**任務**:
- ✅ UserAvatar
- ✅ RatingDisplay
- ✅ CommentImages
- ✅ CommentCard
- ✅ VenueInfo
- ✅ DownloadBanner
- ✅ DownloadCTA

**開發順序**:
1. 最底層：UserAvatar, RatingDisplay
2. 中層：CommentImages, VenueInfo
3. 組合層：CommentCard
4. 功能層：DownloadBanner, DownloadCTA

**檢查清單**:
- [ ] 所有元件符合設計系統
- [ ] RWD 響應式設計
- [ ] 圖片優化（next/image）
- [ ] 載入狀態（Skeleton）

---

### 階段 5: 頁面開發（2 天）

**任務**:
- ✅ 評論詳細頁（/r/[id]）
- ✅ 用戶檔案頁（/u/[id]）
- ✅ Layout（統一結構）
- ✅ Open Graph 設定

**檢查清單**:
- [ ] Server Components 正確使用
- [ ] Metadata 正確生成
- [ ] Deep Link 功能運作
- [ ] Loading 狀態處理
- [ ] Error 處理

---

### 階段 6: Deep Link 與 CTA（1 天）

**任務**:
- ✅ Deep Link 邏輯實作
- ✅ 裝置偵測
- ✅ App 開啟/下載導向
- ✅ 統計追蹤（Google Analytics）

**檢查清單**:
- [ ] iOS Deep Link 運作
- [ ] Android Deep Link 運作
- [ ] Fallback 到商店正確
- [ ] 桌面版顯示正確訊息

---

### 階段 7: 測試與優化（1 天）

**任務**:
- ✅ 各裝置測試（iOS, Android, Desktop）
- ✅ 效能優化（Core Web Vitals）
- ✅ SEO 檢查
- ✅ 錯誤處理完善

**檢查清單**:
- [ ] Lighthouse 分數 > 90
- [ ] 圖片最佳化
- [ ] Open Graph 預覽正確
- [ ] 所有連結運作
- [ ] 404 頁面處理

---

## 🔌 API 規格

### 後端需要提供的 API

#### 1. 取得評論詳細資料

```
GET /api/comments/:id

Response:
{
  "id": "comment123",
  "content": "店家超友善！服務生主動問有沒有需要水碗...",
  "rating": 5.0,
  "feedbackType": 1,  // 1: 抓抓, 2: 便便
  "images": [
    "https://cdn.ptalk.com/comments/img1.jpg",
    "https://cdn.ptalk.com/comments/img2.jpg"
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "user": {
    "id": "user123",
    "name": "小明的柴犬",
    "avatar": "https://cdn.ptalk.com/avatars/user123.jpg"
  },
  "venue": {
    "id": "venue123",
    "name": "貓狗好朋友咖啡廳",
    "address": "台北市大安區和平東路二段 123 號",
    "rating": 4.5,
    "reviewCount": 127,
    "mainImage": "https://cdn.ptalk.com/venues/venue123.jpg"
  }
}
```

#### 2. 取得相關評論（同店家其他評論）

```
GET /api/comments/:id/related?limit=5

Response:
{
  "comments": [
    { ...Comment },
    { ...Comment },
    { ...Comment }
  ],
  "total": 127
}
```

#### 3. 取得用戶資料

```
GET /api/users/:id

Response:
{
  "id": "user123",
  "name": "小明的柴犬",
  "avatar": "https://cdn.ptalk.com/avatars/user123.jpg",
  "commentCount": 23
}
```

#### 4. 取得用戶評論列表

```
GET /api/users/:id/comments?limit=10

Response:
{
  "comments": [
    { ...Comment },
    { ...Comment }
  ],
  "total": 23
}
```

---

## 🚀 部署計劃

### 推薦平台：Vercel

**理由**:
- ✅ Next.js 原生支援
- ✅ 自動 CI/CD
- ✅ 全球 CDN
- ✅ 免費額度充足

### 部署步驟

1. **連接 GitHub**
   - 將專案推送到 GitHub
   - 在 Vercel 連接 Repository

2. **設定環境變數**
   ```
   NEXT_PUBLIC_API_URL=https://api.pettalk.com
   NEXT_PUBLIC_APP_SCHEME=ptalk://
   NEXT_PUBLIC_IOS_APP_URL=https://...
   NEXT_PUBLIC_ANDROID_APP_URL=https://...
   ```

3. **設定自訂網域**
   - 購買網域：`ptalk.app`
   - 設定 DNS：CNAME 指向 Vercel
   - 啟用 HTTPS

4. **效能優化**
   - 啟用 Image Optimization
   - 設定 Cache Headers
   - 啟用 Compression

---

## ✅ 檢查清單

### 開發前檢查

- [ ] 確認 API 端點可用
- [ ] 取得測試資料
- [ ] 確認 App URL Scheme
- [ ] 準備 Logo 和圖片資源

### 開發中檢查

**設計系統**
- [ ] 顏色符合 App
- [ ] 圓角符合 App
- [ ] 間距符合 App
- [ ] 字體大小合理

**功能檢查**
- [ ] 評論詳細頁運作
- [ ] 用戶檔案頁運作
- [ ] Deep Link 運作
- [ ] 圖片載入正常
- [ ] RWD 響應式

**SEO 檢查**
- [ ] Meta Tags 正確
- [ ] Open Graph 正確
- [ ] Sitemap 生成
- [ ] robots.txt 設定

### 上線前檢查

**效能**
- [ ] Lighthouse Performance > 90
- [ ] 圖片已優化
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s

**相容性**
- [ ] iOS Safari 測試
- [ ] Android Chrome 測試
- [ ] Desktop Chrome 測試
- [ ] Desktop Safari 測試

**安全性**
- [ ] HTTPS 啟用
- [ ] CSP Headers 設定
- [ ] API 錯誤處理

---

## 📞 下一步

準備好開始了嗎？建議的執行順序：

1. **建立專案** - 跑階段 1 的指令
2. **設計系統** - 實作 Tailwind 配置和基礎元件
3. **測試 API** - 確認後端 API 可用
4. **核心開發** - 依照階段 4-6 開發
5. **測試上線** - 階段 7 並部署到 Vercel

需要我幫你：
- 生成完整的程式碼檔案？
- 建立 package.json？
- 寫某個元件的完整實作？

告訴我你想從哪裡開始！
