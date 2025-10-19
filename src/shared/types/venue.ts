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

// 評分分佈
export interface RatingDistribution {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
}

// 評分摘要（與 API 結構一致）
export interface RatingSummary {
  positive: {
    rating: number;
    count: number;
  };
  negative: {
    rating: number;
    count: number;
  };
  distribution: {
    positive: RatingDistribution;
    negative: RatingDistribution;
  };
}

// 營業時間
export interface OpeningHourPeriod {
  open: string;
  close: string;
}

export interface OpeningHour {
  dayType: number; // 1-7 代表星期一到星期日
  periods: OpeningHourPeriod[];
}

// 店家狀態
export interface VenueStatus {
  open: boolean;
  openingTime: string;
}

// 店家操作權限
export interface VenueActions {
  edit: boolean;
  bookmark: boolean;
}

// Venue 型別 - 完全符合後端 API 回應
export interface Venue {
  id: string;
  name: string;
  categoryType: CategoryType;
  location: Location;
  address: string;
  images: string[];
  phone?: string;
  googleMapsUrl?: string | null;
  googlePhotoUrl?: string | null;
  openingHours: OpeningHour[];
  ratingSummary: RatingSummary;
  status: VenueStatus;
  actions: VenueActions;
}

// VenueDetail 繼承 Venue（目前與 Venue 相同）
export interface VenueDetail extends Venue {}
