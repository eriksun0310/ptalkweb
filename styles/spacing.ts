// 間距系統 - 與 React Native App 同步

export const Spacing = {
  xs: '4px', // 極小間距
  sm: '8px', // 小間距
  md: '12px', // 中間距
  lg: '16px', // 大間距
  xl: '20px', // 特大間距
  xxl: '24px', // 超大間距
  xxxl: '32px', // 極大間距
} as const;

export type SpacingKey = keyof typeof Spacing;
