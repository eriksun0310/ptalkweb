// 圓角系統 - 與 React Native App 同步

export const BorderRadius = {
  xs: '4px', // 小圓角 - 標籤
  sm: '6px', // 小圓角 - 評分顯示
  md: '8px', // 中圓角 - 輸入框
  lg: '12px', // 大圓角 - 圖片容器
  xl: '16px', // 特大圓角 - 主要卡片
  xxl: '20px', // 超大圓角 - 頭像
  full: '9999px', // 圓形
} as const;

export type BorderRadiusKey = keyof typeof BorderRadius;
