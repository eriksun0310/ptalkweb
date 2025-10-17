// Venue type definitions - 與 React Native App 同步

export enum CategoryType {
  Restaurant = 1, // 餐廳
  Cafe = 2, // 咖啡廳
  Hotel = 3, // 旅館
  Park = 4, // 公園
  Other = 5, // 其他
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Venue {
  id: string;
  name: string;
  categoryType: CategoryType;
  location: Location;
  description: string;
  createTime: string;
  updateTime: string;
  // Web端額外欄位
  address?: string; // 從 location 轉換而來
  pawRating?: number; // 抓抓平均評分 (0-5)
  pawCount?: number; // 抓抓評論數量
  poopRating?: number; // 便便平均評分 (0-5)
  poopCount?: number; // 便便評論數量
  mainImage?: string; // 店家主圖
}

export interface VenueDetail extends Venue {
  phone?: string;
  website?: string;
  openingHours?: string;
  tags?: string[];
}
