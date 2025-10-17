// 陰影系統 - 與 React Native App 同步

export const Shadow = {
  light: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  medium: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
  heavy: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
} as const;

export type ShadowKey = keyof typeof Shadow;
