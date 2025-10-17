
/**
 * Select 元件的統一選項格式工具函數
 * 統一使用物件格式，保留資料完整性
 */

import { City, District } from '@/app/store/features/location/types';

// Select 元件的統一選項格式
export interface SelectOption {
  key: string;    // 唯一標識（用於 React key）
  value: string;  // 顯示文字和選擇值
}

/**
 * 建立城市選項
 */
export const createCityOptions = (cities: City[]): SelectOption[] =>
  cities.map(city => ({
    key: city.code,
    value: city.name,
  }));

/**
 * 建立地區選項
 */
export const createDistrictOptions = (districts: District[]): SelectOption[] =>
  districts.map(district => ({
    key: district.code || district.name, // 如果沒有 code 就用 name
    value: district.name,
  }));

/**
 * 建立簡單的字串選項（用於簡單場景）
 * 將字串陣列轉換為統一的物件格式
 */
export const createSimpleOptions = (items: string[]): SelectOption[] =>
  items.map(item => ({
    key: item,
    value: item,
  }));

/**
 * 從物件陣列建立選項
 * 適用於已有 label/value 結構的資料
 * value 可以是任何類型，會轉換為字串
 */
export const createOptionsFromObjects = <T extends { label: string; value: string | number }>(
  items: T[]
): SelectOption[] =>
  items.map(item => ({
    key: String(item.value),
    value: item.label,
  }));
