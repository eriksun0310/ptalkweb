# 🧪 Universal Links 和 Open Graph 測試指南

## 📋 已完成的設定

### ✅ Universal Links 設定
- **Apple Team ID**: `4W5HHJ324C`
- **Bundle ID**: `com.ptalk.app`
- **支援路徑**: `/comment/*`, `/user/*`, `/venue/*`
- **檔案位置**: `public/.well-known/apple-app-site-association`

### ✅ Open Graph 優化
- **網域**: `https://ptalkweb.vercel.app`
- **動態圖片**: 每則評論顯示第一張照片
- **網站名稱**: PTalk
- **支援頁面**: 評論、用戶、店家

---

## 🚀 部署後測試步驟

### 1️⃣ 測試 apple-app-site-association 檔案

**訪問網址**:
```
https://ptalkweb.vercel.app/.well-known/apple-app-site-association
```

**預期結果**:
- ✅ 顯示 JSON 內容（不是 404 錯誤）
- ✅ 包含 `"appID": "4W5HHJ324C.com.ptalk.app"`
- ✅ 包含三個路徑：`/comment/*`, `/user/*`, `/venue/*`

**成功範例**:
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "4W5HHJ324C.com.ptalk.app",
        "paths": [
          "/comment/*",
          "/user/*",
          "/venue/*"
        ]
      }
    ]
  }
}
```

---

### 2️⃣ 測試 Open Graph (評論頁面)

#### 方法 A: 使用線上工具

**Open Graph 預覽工具**:
```
https://www.opengraph.xyz/
```

**測試網址**:
```
https://ptalkweb.vercel.app/comment/comment1
https://ptalkweb.vercel.app/comment/comment2
https://ptalkweb.vercel.app/comment/comment3
```

**預期結果**:
- ✅ 標題：`yu 在 Deli Puppy 寵物友善餐廳 的評價 | PTalk`
- ✅ 描述：`會不會看起來太好吃❤️`
- ✅ 圖片：馬爾濟斯的照片（Unsplash 圖片）
- ✅ 網站名稱：PTalk

#### 方法 B: Facebook 分享偵錯工具

**Facebook Debugger**:
```
https://developers.facebook.com/tools/debug/
```

**步驟**:
1. 輸入網址：`https://ptalkweb.vercel.app/comment/comment1`
2. 點擊「偵錯」
3. 查看預覽卡片

**預期結果**:
- ✅ 顯示完整的預覽卡片
- ✅ 圖片正確載入
- ✅ 標題和描述正確顯示

#### 方法 C: Twitter Card Validator

**Twitter Card Validator**:
```
https://cards-dev.twitter.com/validator
```

**步驟**:
1. 輸入網址：`https://ptalkweb.vercel.app/comment/comment1`
2. 點擊「Preview card」

**預期結果**:
- ✅ Card type: `summary_large_image`
- ✅ 圖片正確顯示
- ✅ 標題和描述正確

---

### 3️⃣ 測試實際分享（LINE）

**步驟**:
1. 開啟 LINE 手機 App
2. 找一個對話（可以是自己的「記事本」）
3. 複製網址：`https://ptalkweb.vercel.app/comment/comment1`
4. 貼上並發送
5. 查看預覽卡片

**預期結果**:
- ✅ 自動顯示預覽卡片
- ✅ 圖片：馬爾濟斯的照片
- ✅ 標題：yu 在 Deli Puppy 寵物友善餐廳 的評價 | PTalk
- ✅ 描述：會不會看起來太好吃❤️

**不同評論的測試**:
```
comment1 → 馬爾濟斯的照片
comment2 → 貓咪的照片
comment3 → 黃金獵犬的照片
```

---

### 4️⃣ 測試 Universal Links（需要實體 iPhone）

**前提條件**:
- ✅ iPhone 已安裝 PTalk App
- ✅ App 的 Bundle ID 是 `com.ptalk.app`
- ✅ App 已設定 Associated Domains（App 端設定）

**測試步驟**:

#### Step 1: 透過 LINE 測試
1. 在 iPhone 的 LINE 傳送：`https://ptalkweb.vercel.app/comment/comment1`
2. 點擊連結

**預期結果**:
- ✅ 自動開啟 PTalk App（不是 Safari）
- ✅ 跳轉到評論頁面

#### Step 2: 透過備忘錄測試
1. 開啟 iPhone「備忘錄」App
2. 貼上網址：`https://ptalkweb.vercel.app/comment/comment1`
3. 點擊網址

**預期結果**:
- ✅ 自動開啟 PTalk App

#### Step 3: 透過 Safari 測試
1. 開啟 Safari
2. 輸入：`https://ptalkweb.vercel.app/comment/comment1`
3. 前往網頁
4. 應該會看到頁面頂部有「Open in PTalk」的橫幅（iOS 系統提供）

---

### 5️⃣ 測試其他頁面類型

#### 用戶頁面
```
https://ptalkweb.vercel.app/user/user1
```

**預期 Open Graph**:
- 標題：`yu 的評論 | PTalk`
- 描述：`查看 yu 的 3 則寵物友善店家評論`
- 圖片：用戶頭像（根據 genderType + partnerType）

#### 店家頁面
```
https://ptalkweb.vercel.app/venue/venue1
```

**預期 Open Graph**:
- 標題：`Deli Puppy 寵物友善餐廳 - 寵物友善店家 | PTalk`
- 描述：`查看 Deli Puppy 寵物友善餐廳 的 1 則評論，評分 4.0`
- 圖片：店家主圖

---

## 🔧 如果 Universal Links 沒有作用

### 檢查清單

#### 1. 檔案可訪問性
```bash
curl https://ptalkweb.vercel.app/.well-known/apple-app-site-association
```
- 應該回傳 JSON 內容
- Content-Type 應該是 `application/json`

#### 2. App 端設定（需要 iOS 開發者檢查）

App 的 Xcode 專案需要：
- ✅ 在「Signing & Capabilities」加入「Associated Domains」
- ✅ 加入 domain：`applinks:ptalkweb.vercel.app`
- ✅ App 需要重新編譯並安裝

範例設定：
```
Associated Domains:
  applinks:ptalkweb.vercel.app
```

#### 3. iOS 快取問題
iOS 會快取 apple-app-site-association 檔案，如果之前測試失敗：
1. 刪除 App 並重新安裝
2. 重啟 iPhone
3. 等待幾分鐘讓 iOS 重新抓取

#### 4. 驗證工具
使用 Apple 官方驗證工具：
```
https://search.developer.apple.com/appsearch-validation-tool/
```

輸入網址：`https://ptalkweb.vercel.app`

---

## 📊 測試結果記錄

### apple-app-site-association
- [ ] 檔案可訪問（200 OK）
- [ ] JSON 格式正確
- [ ] Content-Type 正確
- [ ] appID 正確

### Open Graph（評論頁面）
- [ ] opengraph.xyz 預覽正確
- [ ] Facebook Debugger 預覽正確
- [ ] Twitter Card 預覽正確
- [ ] LINE 分享預覽正確
- [ ] 不同評論顯示不同圖片

### Open Graph（用戶頁面）
- [ ] 標題正確
- [ ] 描述包含評論數量
- [ ] 頭像顯示正確

### Open Graph（店家頁面）
- [ ] 標題包含店家名稱
- [ ] 描述包含評論數和評分
- [ ] 主圖顯示正確

### Universal Links（iPhone 實測）
- [ ] LINE 點擊連結開啟 App
- [ ] 備忘錄點擊連結開啟 App
- [ ] Safari 顯示「Open in PTalk」橫幅
- [ ] 正確跳轉到評論頁面

---

## 🐛 常見問題排查

### Q: apple-app-site-association 顯示 404
**解決方法**:
1. 確認檔案在 `public/.well-known/` 資料夾
2. 重新部署到 Vercel
3. 清除瀏覽器快取

### Q: Open Graph 圖片不顯示
**解決方法**:
1. 檢查圖片 URL 是否可訪問
2. 確認圖片 URL 是完整的（包含 https://）
3. 使用 Facebook Debugger 強制刷新快取

### Q: LINE 分享預覽是舊的
**解決方法**:
- LINE 會快取預覽，可能需要 24-48 小時更新
- 可以改用 Facebook Debugger 測試

### Q: Universal Links 開啟 Safari 而不是 App
**可能原因**:
1. App 沒有設定 Associated Domains
2. App 的 Bundle ID 不是 `com.ptalk.app`
3. iOS 快取問題（刪除 App 重裝）
4. 網址格式不符（確保是 `https://ptalkweb.vercel.app/comment/*`）

---

## ✅ 全部完成後

如果所有測試都通過，你的設定就完成了！

**使用者體驗**:
1. 分享連結到 LINE → 漂亮的預覽卡片 ✨
2. 點擊連結（有裝 App）→ 自動開啟 App 🚀
3. 點擊連結（沒裝 App）→ 開啟網頁版 🌐

---

**建立日期**: 2025-10-18
**維護者**: Claude Code
