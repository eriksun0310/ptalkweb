# 專案開發指南

## 🎯 核心原則

### 1. 語言要求
- **所有回覆必須使用繁體中文**
- 程式碼註解使用繁體中文
- 錯誤訊息使用繁體中文
- 文件撰寫使用繁體中文

### 2. 不重複程式碼 (DRY) 極致執行
```
發現重複 → 立即重構
寫新功能 → 先檢查現有程式碼
三次法則 → 出現三次必須抽取
```

**執行策略**：
- **立即重構**：發現任何重複程式碼立即抽取
- **預防性檢查**：新功能開發前先搜尋現有實現
- **三次法則**：同樣邏輯出現三次必須抽取為共用函數/元件
- **工具化**：重複的樣式、配置、API 呼叫邏輯集中管理

### 3. 單一職責原則
```
一個函數 → 一個功能
一個類別 → 一個責任
一個模組 → 一個主題
```

**實踐指南**：
- **函數職責**：每個函數只做一件事，函數名稱明確表達其功能
- **元件職責**：UI 元件只負責渲染，業務邏輯分離到自訂 hooks 或服務
- **模組職責**：每個檔案/模組只處理一個主題域的功能
- **資料夾職責**：按功能分組，避免雜亂無章的結構

### 4. 可讀性優於聰明
```
清楚 > 簡潔
明確 > 隱晦
維護性 > 炫技
```

**編碼準則**：
- **命名明確**：變數、函數、類別名稱必須一看就懂其用途
- **註解適度**：複雜邏輯必須有註解，但程式碼本身應該是自我解釋的
- **避免炫技**：不使用過於複雜的語法糖或技巧，優先考慮團隊維護
- **結構清晰**：程式碼組織結構讓任何人都能快速理解

### 5. 高效方案優先
- **當要求「分析」或「討論」時**：提供經過深思熟慮的高效解決方案
- **不提供快速但低效的權宜之計**
- **考慮長期維護性和擴展性**
- **優先考慮架構設計而非臨時解決方案**

## 💻 實戰範例

### 不重複程式碼原則實踐範例

❌ **重複程式碼（錯誤）**：
```typescript
// UserCard.tsx
const handleUserClick = (user) => {
  if (!user.isActive) {
    showAlert('錯誤', '使用者已被停用')
    return
  }
  if (!user.permissions.includes('read')) {
    showAlert('錯誤', '沒有查看權限')
    return
  }
  navigateToUser(user.id)
}

// ProductCard.tsx
const handleProductClick = (product) => {
  if (!product.isActive) {
    showAlert('錯誤', '產品已下架')
    return
  }
  if (!product.permissions.includes('read')) {
    showAlert('錯誤', '沒有查看權限')
    return
  }
  navigateToProduct(product.id)
}
```

✅ **抽取共用邏輯（正確）**：
```typescript
// shared/utils/permission.ts
export const validateItemAccess = (item: any, itemType: string) => {
  if (!item.isActive) {
    const message = itemType === 'user' ? '使用者已被停用' : '產品已下架'
    showAlert('錯誤', message)
    return false
  }

  if (!item.permissions.includes('read')) {
    showAlert('錯誤', '沒有查看權限')
    return false
  }

  return true
}

// UserCard.tsx
const handleUserClick = (user: User) => {
  if (validateItemAccess(user, 'user')) {
    navigateToUser(user.id)
  }
}

// ProductCard.tsx
const handleProductClick = (product: Product) => {
  if (validateItemAccess(product, 'product')) {
    navigateToProduct(product.id)
  }
}
```

### 單一職責原則範例

❌ **多重職責（錯誤）**：
```typescript
// 一個函數做太多事情
const processUserData = (userData: any) => {
  // 驗證資料
  if (!userData.email || !userData.name) {
    throw new Error('資料不完整')
  }

  // 格式化資料
  const formattedData = {
    ...userData,
    email: userData.email.toLowerCase(),
    name: userData.name.trim(),
    createdAt: new Date().toISOString()
  }

  // 儲存到資料庫
  database.users.save(formattedData)

  // 發送歡迎郵件
  emailService.sendWelcomeEmail(formattedData.email)

  // 記錄日誌
  logger.info(`新使用者註冊: ${formattedData.email}`)

  return formattedData
}
```

✅ **單一職責（正確）**：
```typescript
// 分離各自職責
const validateUserData = (userData: any) => {
  if (!userData.email || !userData.name) {
    throw new Error('資料不完整')
  }
  return true
}

const formatUserData = (userData: any) => ({
  ...userData,
  email: userData.email.toLowerCase(),
  name: userData.name.trim(),
  createdAt: new Date().toISOString()
})

const saveUser = (userData: any) => {
  return database.users.save(userData)
}

const sendWelcomeEmail = (email: string) => {
  return emailService.sendWelcomeEmail(email)
}

const logUserRegistration = (email: string) => {
  logger.info(`新使用者註冊: ${email}`)
}

// 主流程：組合各個單一職責的函數
const registerUser = async (userData: any) => {
  validateUserData(userData)
  const formattedData = formatUserData(userData)

  const savedUser = await saveUser(formattedData)
  await sendWelcomeEmail(savedUser.email)
  logUserRegistration(savedUser.email)

  return savedUser
}
```

### 可讀性優於聰明範例

❌ **過於聰明（錯誤）**：
```typescript
// 難以理解的三元運算符嵌套
const status = user?.status === 'active' ?
  user.subscription?.type === 'premium' ?
    user.permissions?.admin ? 'admin' : 'premium'
    : 'basic'
  : 'inactive'

// 過度簡化的變數名
const u = users.filter(x => x.a && x.s === 'a').map(y => ({...y, t: Date.now()}))
```

✅ **清楚明確（正確）**：
```typescript
// 清楚的條件判斷
const getUserStatus = (user: User) => {
  if (!user || user.status !== 'active') {
    return 'inactive'
  }

  if (user.permissions?.admin) {
    return 'admin'
  }

  if (user.subscription?.type === 'premium') {
    return 'premium'
  }

  return 'basic'
}

const status = getUserStatus(user)

// 明確的變數命名和操作
const activeUsers = users.filter(user =>
  user.isActive && user.status === 'active'
)

const usersWithTimestamp = activeUsers.map(user => ({
  ...user,
  lastAccessTime: Date.now()
}))
```

## 📁 架構設計

### Feature-Sliced Design (功能切片設計)
**重要：只建立實際需要的資料夾，避免空資料夾**

基本結構模式：
```
src/
├── app/                 # 應用程式層級配置
│   ├── layout.tsx      # 全域佈局
│   └── page.tsx        # 主頁面
│
├── features/           # 功能模組（複雜功能時建立）
│   ├── auth/
│   ├── comments/
│   └── venues/
│
└── shared/             # 共用層
    ├── api/           # API 客戶端（需要時建立）
    ├── config/        # 統一配置檔案
    ├── hooks/         # 自定義 hooks 或工具函數
    ├── theme/         # 主題系統
    ├── types/         # 型別定義
    ├── ui/            # 基礎 UI 元件
    └── utils/         # 工具函式
```

**未來擴展原則**：
- 只有在實際需要功能時才建立新資料夾
- 每個新資料夾必須包含實際檔案，不允許空資料夾
- 遵循「有功能才建資料夾」的原則

### 型別定義管理

#### 型別定義分類結構
```
src/shared/types/
├── common.ts           # 共用基礎型別
├── user.ts            # 使用者相關型別
├── comment.ts         # 評論相關型別
├── venue.ts           # 場所相關型別
└── index.ts           # 統一導出所有型別
```

#### 型別命名規範
- 介面/類型：使用 PascalCase（如：`User`, `Comment`, `VenueInfo`）
- 列舉：使用 PascalCase（如：`GenderType`, `PartnerType`）
- 常數：使用 UPPER_SNAKE_CASE（如：`MAX_COMMENTS`, `API_BASE_URL`）

### 共用元件管理

#### 元件分類原則
- **全域共用元件**：放在 `src/shared/ui/` 下，整個應用程式都可使用
- **功能特定元件**：放在各自的 feature 目錄下
- **所有在 `src/shared/ui/` 下的元件都視為全域共用元件**

#### 元件結構標準
每個元件資料夾包含：
```
ComponentName/
├── ComponentName.tsx           # 主元件檔案
├── ComponentName.types.ts      # 型別定義（如適用）
└── index.ts                    # 統一導出
```

**新增元件原則**：
- 只有在實際需要該元件時才建立對應資料夾
- 避免建立空的預設資料夾
- 每個元件資料夾必須包含實際的元件檔案

### 狀態管理規範

#### 表單狀態管理原則
**重要：絕對不允許分開定義多個狀態變數**

❌ **錯誤寫法**：
```typescript
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
// ... 更多個別狀態
```

✅ **正確寫法**：
```typescript
// 表單狀態必須用物件統一管理
const [form, setForm] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 錯誤狀態也用物件管理
const [errors, setErrors] = useState<Record<string, string>>({})

// 統一的更新函數
const updateForm = (field: string, value: any) => {
  setForm(prev => ({ ...prev, [field]: value }))
}
```

### 程式碼整潔原則

#### 資料夾管理
**重要：基於實際功能需求建立資料夾，避免空資料夾**

✅ **正確做法**：
- 只有在實際需要該功能時才建立對應資料夾
- 定期清理未使用的空資料夾
- 遵循 Feature-Sliced Design，但僅建立有實際功能的層級

❌ **錯誤做法**：
- 預先建立一堆空的功能資料夾
- 保留沒有檔案的空資料夾
- 建立過度複雜的資料夾結構

#### Import 語句管理
**重要：保持 import 語句整潔，移除未使用的 import**

Import 順序規範：
```typescript
// 1. React 核心
import React, { useState, useEffect } from 'react'

// 2. Next.js 相關
import Link from 'next/link'
import Image from 'next/image'

// 3. 第三方套件
import clsx from 'clsx'

// 4. 內部套件（hooks, utils, ui）
import { useTheme } from '@/shared/hooks'
import { Button, Card } from '@/shared/ui'

// 5. 型別定義
import type { User, Comment } from '@/shared/types'

// 6. 樣式
import styles from './Component.module.css'
```

### 配置管理

#### 統一配置原則
所有選項配置集中在配置檔案中：
```
src/shared/config/
├── app.config.ts       # 應用程式配置
├── api.config.ts       # API 配置
└── index.ts            # 統一導出
```

### UI/UX 規範

#### 圖標使用原則
**重要：禁止使用 Emoji，必須使用圖標庫**

❌ **錯誤做法**：
```typescript
// 使用 emoji
<div className="text-6xl">❌</div>
<div className="text-6xl">📭</div>
<div className="text-6xl">🔍</div>
```

✅ **正確做法**：
```typescript
// 使用 lucide-react 或其他圖標庫
import { XCircle, Inbox, SearchX } from 'lucide-react';

<XCircle className="w-16 h-16 text-red-400" strokeWidth={1.5} />
<Inbox className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
<SearchX className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
```

**原因**：
- Emoji 在不同平台/瀏覽器顯示不一致
- 無法精確控制大小、顏色、樣式
- 圖標庫提供更專業、一致的視覺效果
- 更容易維護和調整

## ✅ 開發檢查清單

### 🔍 代碼審查清單（每次提交前）

#### 不重複程式碼原則檢查
- [ ] 是否有重複的邏輯可以抽取？
- [ ] 相似的函數能否合併？
- [ ] 重複的樣式/配置是否已統一管理？
- [ ] API 呼叫邏輯是否集中？

#### 單一職責檢查
- [ ] 每個函數是否只做一件事？
- [ ] 元件職責是否明確分離？
- [ ] 業務邏輯是否從 UI 層分離？
- [ ] 檔案/模組是否只處理一個主題？

#### 可讀性檢查
- [ ] 變數和函數命名是否一看就懂？
- [ ] 複雜邏輯是否有適當註解？
- [ ] 程式碼結構是否清晰易懂？
- [ ] 是否避免了過度聰明的寫法？

#### 架構檢查
- [ ] 是否遵循 Feature-Sliced Design 架構？
- [ ] 共用元件是否放在 `shared/ui/`？
- [ ] 型別定義是否按功能分類？
- [ ] 是否有不必要的空資料夾？

#### 狀態管理檢查
- [ ] 表單狀態是否用物件統一管理？
- [ ] 是否避免了多個分散的狀態？

#### 程式碼整潔檢查
- [ ] 未使用的 import 是否已移除？
- [ ] import 順序是否正確？
- [ ] 是否有未使用的變數或函數？
- [ ] 檔案結構是否整齊？

#### UI/UX 檢查
- [ ] 是否使用了 emoji？（應改用圖標庫）
- [ ] 圖標尺寸和顏色是否一致？
- [ ] 是否遵循設計規範？

### 🚀 新功能開發流程

1. **需求分析**
   - 確認實際需要的功能
   - 檢查是否有現有類似功能可複用

2. **設計階段**
   - 規劃 FSD 架構，按需建立資料夾
   - 定義清楚的介面和型別
   - 設計可複用的元件結構

3. **開發階段**
   - 先檢查現有程式碼，避免重複開發
   - 撰寫單一職責的函數
   - 保持程式碼可讀性

4. **程式碼審查**
   - 執行上述檢查清單
   - 清理未使用的程式碼和空資料夾

## 🎖️ 重要提醒

1. **DRY 極致執行** - 發現重複立即重構，三次法則必須遵守
2. **單一職責原則** - 一個函數一個功能，職責明確分離
3. **可讀性第一** - 清楚勝過簡潔，明確勝過隱晦
4. **高效方案優先** - 分析討論時提供高效解決方案，不是快速但低效的方法
5. **架構原則** - 遵循 Feature-Sliced Design，只建立實際需要的資料夾
6. **型別管理** - 按功能分類管理型別定義
7. **元件管理** - `shared/ui/` 下的所有元件都是全域共用元件
8. **配置統一** - 所有選項配置集中管理
9. **狀態管理** - 絕對不允許分開定義多個狀態變數，必須用物件統一管理
10. **Import 管理** - 保持 import 語句整潔，移除未使用的 import，遵循標準順序
11. **資料夾管理** - 基於實際功能需求建立資料夾，定期清理空資料夾
12. **繁體中文** - 所有回覆、註解、錯誤訊息、文件都使用繁體中文
13. **禁止使用 Emoji** - 必須使用圖標庫（lucide-react 等），不使用 emoji

---

**版本**: 1.1
**最後更新**: 2025-10-22
**變更記錄**:
- v1.1 (2025-10-22): 新增 UI/UX 規範，禁止使用 Emoji
- v1.0 (2025-01-20): 初始版本
