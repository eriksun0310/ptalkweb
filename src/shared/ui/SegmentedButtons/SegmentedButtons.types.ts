// SegmentedButtons 型別定義

import { ReactNode } from 'react';

export interface SegmentedButtonOption<T = any> {
  /** 選項值 */
  value: T;
  /** 選項標籤（文字） */
  label?: string;
  /** 選項圖標（React 節點） */
  icon?: ReactNode;
  /** 選中時顯示的標題（顯示在圖標下方） */
  selectedTitle?: string;
}

export interface SegmentedButtonsProps<T = any> {
  /** 選項列表 */
  options: SegmentedButtonOption<T>[];
  /** 當前選中的值 */
  value: T;
  /** 值改變時的回調 */
  onChange: (value: T) => void;
  /** 自訂 className */
  className?: string;
  /** 垂直佈局（圖標在上，文字在下） */
  vertical?: boolean;
}
