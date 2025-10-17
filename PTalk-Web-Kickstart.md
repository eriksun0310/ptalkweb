# PTalk 網頁版開發啟動指南

> 給 AI 助手（Claude）的完整引導文件

---

## 📌 專案背景

我正在開發 **PTalk 網頁版**，這是一個極簡版的評論預覽平台。

**核心目標：**
- 讓未下載 App 的用戶能查看分享的評論
- 完整顯示單則評論（建立信任）
- 引導用戶下載 App

**技術棧：**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Feature-Sliced Design 架構

**重要：設計系統必須與 React Native App 完全一致**

---

## 📂 相關文件

請先閱讀以下文件：

1. **完整規格書**: `docs/PTalk-Web-MVP-Plan.md`
   - 包含完整的設計系統、架構、功能規格

2. **App 設計系統**: `constants/style.tsx`
   - 顏色、圓角、間距定義（網頁版必須同步）

3. **型別定義**: `shared/types/`
   - 評論、用戶、店家的型別（網頁版可複用）

---

## 🚀 開發階段規劃

### **階段 1: 專案初始化** ⏱️ 30 分鐘

**目標**: 建立基礎專案結構

**任務清單**:
- [ ] 初始化 Next.js 14 專案
- [ ] 安裝必要依賴
- [ ] 建立 FSD 資料夾結構
- [ ] 設定 TypeScript 配置
- [ ] 設定 ESLint + Prettier
- [ ] 建立環境變數檔案

**需要執行的指令**:
```bash
# 1. 初始化專案
npx create-next-app@latest ptalk-web --typescript --tailwind --app --no-src-dir

# 2. 進入專案
cd ptalk-web

# 3. 安裝依賴
pnpm add clsx swr lucide-react

# 4. 安裝開發依賴
pnpm add -D @types/node prettier eslint-config-prettier

# 5. 建立 FSD 結構
mkdir -p src/shared/{api,config,lib,types,ui}
mkdir -p src/entities/{comment,venue,user}/{api,ui}
mkdir -p src/features/{download-app,share-preview}/ui
mkdir -p src/widgets/{comment-detail,user-profile}/ui
mkdir -p styles
```

**產出檔案**:
- `package.json`
- `.env.local`
- `.eslintrc.json`
- `.prettierrc`
- `tsconfig.json`
- 基礎資料夾結構

---

### **階段 2: 設計系統設定** ⏱️ 45 分鐘

**目標**: 建立與 App 一致的設計系統

**任務清單**:
- [ ] 設定 Tailwind 配置（顏色、圓角、間距）
- [ ] 建立樣式常數檔案
- [ ] 建立基礎 UI 元件（Button, Image）
- [ ] 測試設計系統

**重要**: 從 `constants/style.tsx` 同步所有設計 token

**產出檔案**:
- `tailwind.config.js` ← 包含完整設計系統
- `styles/colors.ts`
- `styles/spacing.ts`
- `styles/radius.ts`
- `styles/shadows.ts`
- `src/shared/ui/Button/Button.tsx`
- `src/shared/ui/Image/Image.tsx`

**驗證方式**:
```typescript
// 測試：顏色是否正確
const testColor = '#2196F3'; // App 的 blueText
// Tailwind: className="text-primary" 應該顯示相同顏色
```

---

### **階段 3: API 層建立** ⏱️ 30 分鐘

**目標**: 建立 API Client 和型別定義

**任務清單**:
- [ ] 建立 Fetch API Wrapper
- [ ] 從 App 複製型別定義（Comment, User, Venue）
- [ ] 建立 API 端點函數
- [ ] 錯誤處理機制

**產出檔案**:
- `src/shared/api/client.ts` ← Fetch wrapper
- `src/shared/types/comment.ts`
- `src/shared/types/user.ts`
- `src/shared/types/venue.ts`
- `src/entities/comment/api/getComment.ts`
- `src/entities/user/api/getUser.ts`

**API 端點**:
```typescript
GET /api/comments/:id              // 取得評論詳細
GET /api/comments/:id/related      // 取得相關評論
GET /api/users/:id                 // 取得用戶資料
GET /api/users/:id/comments        // 取得用戶評論列表
```

---

### **階段 4: 核心元件開發** ⏱️ 2 小時

**目標**: 開發可重用的 UI 元件

**開發順序**:
1. 最底層元件（entities）
2. 組合元件
3. 功能元件（features）

**任務清單**:

**4.1 Entities 層**
- [ ] `UserAvatar` - 用戶頭像
- [ ] `RatingDisplay` - 評分顯示（抓抓/便便）
- [ ] `CommentImages` - 評論圖片網格
- [ ] `VenueInfo` - 店家資訊卡片

**4.2 組合元件**
- [ ] `CommentCard` - 評論卡片（組合以上元件）

**4.3 Features 層**
- [ ] `DownloadBanner` - 頂部浮動按鈕
- [ ] `DownloadCTA` - 底部下載區塊

**設計要求**:
- ✅ 必須符合設計系統
- ✅ 支援 RWD（手機、平板、桌面）
- ✅ 圖片使用 `next/image` 優化
- ✅ 包含 Loading 狀態

**產出檔案**:
```
src/entities/
├── user/ui/
│   └── UserAvatar.tsx
├── comment/ui/
│   ├── RatingDisplay.tsx
│   ├── CommentImages.tsx
│   └── CommentCard.tsx
└── venue/ui/
    └── VenueInfo.tsx

src/features/download-app/ui/
├── DownloadBanner.tsx
├── DownloadCTA.tsx
└── DownloadButton.tsx
```

---

### **階段 5: 頁面開發** ⏱️ 2 小時

**目標**: 開發兩個主要頁面

**任務清單**:

**5.1 評論詳細頁** (`/r/[id]`)
- [ ] Server Component 實作
- [ ] Metadata / Open Graph 設定
- [ ] 組合所有元件
- [ ] Loading 和 Error 狀態

**5.2 用戶檔案頁** (`/u/[id]`)
- [ ] Server Component 實作
- [ ] Metadata 設定
- [ ] 評論列表顯示
- [ ] 「查看全部」提示下載

**5.3 Root Layout**
- [ ] 統一的頁面結構
- [ ] Google Analytics（可選）
- [ ] Meta Tags

**產出檔案**:
```
src/app/
├── layout.tsx              # Root Layout
├── page.tsx                # 首頁（重定向）
├── r/[id]/
│   ├── page.tsx           # 評論詳細頁
│   └── loading.tsx        # Loading 狀態
└── u/[id]/
    ├── page.tsx           # 用戶檔案頁
    └── loading.tsx
```

**頁面結構範例**:
```typescript
// app/r/[id]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const comment = await getComment(params.id);
  return {
    title: `${comment.user.name} 在 ${comment.venue.name} 的評價`,
    openGraph: {
      images: [comment.images[0]],
    },
  };
}

export default async function CommentDetailPage({ params }) {
  const comment = await getComment(params.id);
  const relatedComments = await getRelatedComments(params.id, 5);

  return <CommentDetailView comment={comment} related={relatedComments} />;
}
```

---

### **階段 6: Deep Link 功能** ⏱️ 1 小時

**目標**: 實作 App 開啟和下載導向

**任務清單**:
- [ ] 裝置偵測（iOS / Android / Desktop）
- [ ] Deep Link 邏輯（開啟 App）
- [ ] Fallback 邏輯（導向商店）
- [ ] 整合到 Download 按鈕

**產出檔案**:
```
src/shared/lib/
├── deeplink.ts           # Deep Link 核心邏輯
└── device.ts             # 裝置偵測
```

**功能邏輯**:
```typescript
點擊「開啟 App」
  ↓
偵測裝置類型
  ↓
嘗試開啟: ptalk://r/comment123
  ↓
2 秒後檢查：
  - 還在網頁 → 沒安裝 → 導向商店
  - 已離開 → 成功開啟 App ✅
```

---

### **階段 7: 測試與優化** ⏱️ 1 小時

**目標**: 確保品質和效能

**任務清單**:
- [ ] 各裝置測試（iOS, Android, Desktop）
- [ ] Lighthouse 效能測試（目標 > 90）
- [ ] Open Graph 預覽測試
- [ ] 圖片載入優化
- [ ] Error Boundary 設定

**測試檢查清單**:
```
效能:
□ Lighthouse Performance > 90
□ First Contentful Paint < 1.8s
□ Largest Contentful Paint < 2.5s

功能:
□ Deep Link 運作（iOS）
□ Deep Link 運作（Android）
□ 圖片正確載入
□ 評論頁面正確顯示
□ 用戶頁面正確顯示

SEO:
□ Meta Tags 正確
□ Open Graph 圖片顯示
□ Sitemap 生成

相容性:
□ iPhone Safari
□ Android Chrome
□ Desktop Chrome
□ Desktop Safari
```

---

## 🎯 給 AI 助手的工作指示

### **如何與我協作**

**第一次對話時**:
```
使用者會說：「開始階段 X」

你應該：
1. 閱讀該階段的任務清單
2. 詢問是否需要生成所有檔案，或逐個生成
3. 確認 API 端點和環境變數
4. 開始生成程式碼
```

**生成程式碼時**:
- ✅ 一次生成一個完整檔案（包含所有 imports）
- ✅ 加上檔案路徑註解
- ✅ 包含 TypeScript 型別
- ✅ 遵循設計系統（從 `constants/style.tsx`）
- ✅ 使用 TailwindCSS class

**完成每個階段後**:
- ✅ 提供檢查清單
- ✅ 說明下一步
- ✅ 詢問是否有問題

---

## 📝 重要提醒

### **設計系統優先**
```
所有顏色、圓角、間距都必須從 App 的 constants/style.tsx 同步
不可以自己定義新的顏色或尺寸！
```

### **極簡原則**
```
只做兩個頁面：
1. 評論詳細頁 (/r/[id])
2. 用戶檔案頁 (/u/[id])

不要做：
❌ 首頁
❌ 搜尋功能
❌ 店家完整頁面
❌ 篩選功能
```

### **內容限制策略**
```
✅ 完整顯示該則評論
✅ 顯示 3-5 則其他評論
❌ 不顯示全部評論
→ 引導下載 App 查看更多
```

---

## 🚦 開始開發

### **第一步：初始化專案**

告訴 AI 助手：
```
「開始階段 1：專案初始化
請幫我生成所有必要的配置檔案」
```

### **檢查點**

每完成一個階段，確認：
- [ ] 所有檔案都已生成
- [ ] 沒有 TypeScript 錯誤
- [ ] 沒有 ESLint 錯誤
- [ ] 可以成功執行 `pnpm dev`

---

## 📞 需要協助時

**遇到問題時告訴 AI**:
- 「這個元件樣式不對，應該要...」
- 「API 回傳格式不一樣，是...」
- 「可以幫我調整 XXX 嗎？」

**進度追蹤**:
- 「目前完成到哪個階段？」
- 「接下來要做什麼？」
- 「還剩下哪些任務？」

---

## ✅ 最終交付物

完成所有階段後，你會有：

```
ptalk-web/
├── src/
│   ├── app/                    # 2 個頁面
│   ├── shared/                 # 設計系統、API
│   ├── entities/               # 核心元件
│   ├── features/               # 功能元件
│   └── widgets/                # 頁面組合
├── public/                     # 圖片資源
├── styles/                     # 全域樣式
└── 所有配置檔案

功能：
✅ 評論詳細頁（完整）
✅ 用戶檔案頁（完整）
✅ Deep Link 功能
✅ Open Graph 分享預覽
✅ RWD 響應式
✅ 設計系統與 App 一致
```

**部署到 Vercel 即可上線！** 🚀

---

## 🎯 成功標準

- [ ] 網頁版看起來和 App 一模一樣
- [ ] 可以分享評論連結給朋友
- [ ] 朋友點開可以看到完整評論
- [ ] 有明確的下載 CTA
- [ ] Deep Link 可以開啟 App
- [ ] Lighthouse 分數 > 90

---

準備好了嗎？告訴 AI 助手：「開始階段 1」🚀
