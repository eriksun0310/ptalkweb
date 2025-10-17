// 字體系統 - 與 React Native App 同步

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

export type TypographyKey = keyof typeof Typography;
