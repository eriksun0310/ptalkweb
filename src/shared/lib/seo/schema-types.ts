/**
 * Schema.org 結構化資料類型定義
 * 用於 JSON-LD 生成
 */

import type { Venue, Comment, User, CategoryType } from '@/shared/types';

/**
 * 基礎 Schema 類型
 */
export interface BaseSchema {
  '@context': 'https://schema.org';
  '@type': string;
}

/**
 * LocalBusiness Schema - 店家資訊
 */
export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness';
  name: string;
  description?: string;
  image?: string | string[];
  address?: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  url?: string;
  priceRange?: string;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
}

/**
 * Review Schema - 評論
 */
export interface ReviewSchema extends BaseSchema {
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
    image?: string;
  };
  datePublished: string;
  reviewBody: string;
  reviewRating?: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
  itemReviewed: {
    '@type': 'LocalBusiness' | 'Place';
    name: string;
    image?: string | string[];
    address?: string;
  };
  image?: string | string[];
}

/**
 * BreadcrumbList Schema - 麵包屑導航
 */
export interface BreadcrumbListSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

/**
 * WebSite Schema - 網站資訊
 */
export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

/**
 * ProfilePage Schema - 個人檔案頁面
 */
export interface ProfilePageSchema extends BaseSchema {
  '@type': 'ProfilePage';
  mainEntity: {
    '@type': 'Person';
    name: string;
    image?: string;
    description?: string;
    url?: string;
  };
  dateCreated?: string;
  dateModified?: string;
}

/**
 * ItemList Schema - 項目列表
 */
export interface ItemListSchema extends BaseSchema {
  '@type': 'ItemList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    url?: string;
    name?: string;
    item?: any;
  }>;
  numberOfItems?: number;
}

/**
 * 分類對應到可讀文字
 */
export function getCategoryText(category: CategoryType): string {
  const categoryMap: Record<CategoryType, string> = {
    [1]: '餐廳',
    [2]: '咖啡廳',
    [3]: '旅館',
    [4]: '公園',
    [5]: '其他',
  };
  return categoryMap[category] || '其他';
}

/**
 * 星期轉換為 Schema.org 格式
 */
export function getDayOfWeekSchema(dayType: number): string {
  const dayMap: Record<number, string> = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  };
  return dayMap[dayType] || 'Monday';
}
