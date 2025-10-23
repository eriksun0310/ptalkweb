/**
 * Breadcrumb 元件類型定義
 */

export interface BreadcrumbItem {
  /** 麵包屑項目名稱 */
  name: string;
  /** 連結 URL（當前頁面不需要） */
  href?: string;
}

export interface BreadcrumbProps {
  /** 麵包屑項目列表 */
  items: BreadcrumbItem[];
  /** 自訂樣式 class */
  className?: string;
}
