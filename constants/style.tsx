export const Colors = {
  blueText: '#2196F3',
  greyText: '#737373',
  backgroundGrey: '#f5f5f5',
  borderGrey: '#e8dedd',
  paw: '#ffc107c8',
  poop: '#8B5E3C',
  pawLight: '#fff4d1', // 更淡的黃色
  poopLight: '#d9b8a3', // 更淡的棕色
  blackText: '#000',
  text: '#374151',
  redText: '#F87171',
  danger: '#DC2626', // 危險操作顏色 (刪除帳號等)
  inactiveIcon: '#D3D3D3',
  greenText: '#008000da',
  disabledText: '#D3D3D3',
  logo: '#646A6F',
  mapPaw: '#ffbf00ea',
};

// 統一的圓角常數
export const BorderRadius = {
  xs: 4, // 小圓角 - 按鈕、標籤
  sm: 6, // 小圓角 - 評分顯示
  md: 8, // 中圓角 - 卡片、輸入框
  lg: 12, // 大圓角 - 圖片容器
  xl: 16, // 特大圓角 - 主要卡片
  xxl: 20, // 超大圓角 - 頭像、特殊元件
  full: 999, // 圓形 - 完全圓形元件
};

// 統一的陰影常數
export const Shadow = {
  // 輕微陰影 - 浮動按鈕、工具提示
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  // 中等陰影 - 卡片、彈出框
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // 重陰影 - modal、重要彈出層
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// 統一的間距常數
export const Spacing = {
  xs: 4, // 極小間距
  sm: 8, // 小間距
  md: 12, // 中間距
  lg: 16, // 大間距
  xl: 20, // 特大間距
  xxl: 24, // 超大間距
  xxxl: 32, // 極大間距
};

// 統一的圖片樣式預設
export const ImageStyles = {
  // 縮圖樣式 - 評論、店家預覽
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
  },
  // 頭像樣式
  avatar: {
    borderRadius: BorderRadius.xxl,
  },
  // 卡片圖片樣式 - 店家卡片
  cardImage: {
    borderRadius: BorderRadius.lg,
    ...Shadow.light,
  },
  // 全寬圖片樣式 - 輪播、詳細頁面
  fullWidth: {
    width: '100%',
    borderRadius: BorderRadius.xl,
  },
};
