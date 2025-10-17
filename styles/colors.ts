// 顏色系統 - 與 React Native App 的 constants/style.tsx 同步

export const Colors = {
  // 主要顏色
  primary: '#2196F3', // blueText - 主要按鈕、連結
  text: '#374151', // 主要文字
  textSecondary: '#737373', // greyText - 次要文字
  textLight: '#a7a7a7', // 更多文字提示

  // 背景顏色
  background: '#f5f5f5', // backgroundGrey
  surface: '#ffffff', // 卡片背景
  border: '#e8dedd', // borderGrey

  // 評分顏色
  paw: '#ffc107c8', // 抓抓評分
  pawLight: '#fff4d1', // 抓抓背景
  poop: '#8B5E3C', // 便便評分
  poopLight: '#d9b8a3', // 便便背景

  // 狀態顏色
  success: '#008000da', // greenText
  danger: '#DC2626', // 危險操作
  error: '#F87171', // redText
  disabled: '#D3D3D3', // disabledText

  // Logo 顏色
  logo: '#646A6F',
} as const;

export type ColorKey = keyof typeof Colors;
