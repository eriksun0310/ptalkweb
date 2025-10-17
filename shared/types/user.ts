import { PetInfo } from './pet';

enum UserStatus {
  Registering = 0, // 註冊中
  RegistrationCompleted = 1, // 註冊完成
}

type User = {
  id: string;
  name: string;
  email: string;
  genderType: UserGenderType; // 用戶性別: 1=男生, 2=女生, 3=秘密
  partnerType: PartnerType; // 夥伴類型: 1=老實說狗狗, 2=老實說貓貓
  mapWarningIconType: MapWarningIcon; // 地圖警告圖示類型: 1 = 怒怒屎, 2 = 氣氣屎
  petInfo: PetInfo | null; // 寵物資訊
  status: UserStatus; // 用戶狀態: 0=註冊中, 1=註冊完成
  expoPushToken?: string; // Expo 推播 token（可選）
  userComments?: CommentItem[]; // 用戶評論列表（可選，用於其他用戶資料頁面）
  userBookmarks?: Venue[]; // 用戶收藏店家列表（可選，用於其他用戶資料頁面）
};

enum PetFriendlyLevel {
  Low = 1, // 低
  Medium = 2, // 中
  High = 3, // 高
}

enum PetFriendlyLevelAll {
  All = 0, // 全部（僅用於篩選）
  Low = 1, // 低
  Medium = 2, // 中
  High = 3, // 高
}

enum UserGenderType {
  Male = 1, // 男
  Female = 2, // 女
  Secret = 3, // 保密
}

// 夥伴類型
enum PartnerType {
  HonestDog = 1, // 老實說狗狗
  HonestCat = 2, // 老實說貓貓
}

type Reviewer = {
  userId: string;
  name: string;
  genderType: UserGenderType; // 1=男生, 2=女生, 3=秘密
  partnerType: PartnerType; // 1=老實說狗狗, 2=老實說貓貓
};

// 營業時段
type OpeningPeriod = {
  open: string; // 開始時間 "11:30"
  close: string; // 結束時間 "14:30"
};

// 每日營業時間
type DailyOpeningHours = {
  dayType: number; // 1=週一, 2=週二, ..., 7=週日
  periods: OpeningPeriod[];
};

// 地點座標
type Location = {
  lat: number;
  lng: number;
};

// 評分統計
type RatingStats = {
  rating: number;
  count: number;
};

// 評分分佈
type RatingDistribution = {
  positive: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
  negative: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
};

// 評分摘要
type RatingSummary = {
  positive: RatingStats;
  negative: RatingStats;
  distribution: RatingDistribution;
};

// 營業狀態
type BusinessStatus = {
  open: boolean;
  openingTime?: string; // 下次開店時間
};

// 店家操作權限
type BusinessActions = {
  edit: boolean;
  bookmark: boolean;
};

// 完整的店家資訊
type Venue = {
  id: string;
  name: string;
  categoryType: BusinessCategory; // 1=餐廳, 2=醫院, 3=美容院, 4=飯店
  location: Location;
  ratingSummary: RatingSummary;
  status: BusinessStatus;
  address: string;
  phone?: string; // 電話號碼 (選擇性欄位)
  images: string[];
  actions: BusinessActions;
  openingHours: DailyOpeningHours[];
  googleMapsUrl?: string; // Google 地圖連結 (選擇性欄位)
};

// API 回應的外層結構
type VenueApiResponse = {
  id: string;
  data: Venue;
};

enum FeedbackType {
  Paw = 1, // 腳掌圖示
  Poop = 2, // 大便圖示
}

enum FeedbackTypeAll {
  All = 0, // 全部（僅用於篩選）
  Paw = 1, // 腳掌圖示
  Poop = 2, // 大便圖示
}

type Feedback = {
  type: FeedbackType;
  rating: number;
};

type File = {
  fileId: string;
  url: string;
  mediaType: number;
  usageType: number;
};

type CommentItem = {
  id: string;
  reviewer: Reviewer;
  venue: Venue;
  petInfo: PetInfo | null;
  petFriendlyLevel: PetFriendlyLevel; // 1=低, 2=中, 3=高
  feedback: Feedback; // type: 1=腳掌, 2=大便
  content: string;
  files: File[]; // 附加圖片
  // imageUrls: string[];
  updateTime: string; // ISO 格式
};

//老實評鑑指南 類別
type HonestGuide = 'paw' | 'poop';

// 店家類別
enum BusinessCategory {
  Restaurant = 1, // 餐廳
  Hospital = 2, // 醫院
  Salon = 3, // 美容院
  Hotel = 4, // 酒店
}

enum ActionCategory {
  Restaurant = 1, // 餐廳
  Hospital = 2, // 醫院
  Salon = 3, // 美容院
  Hotel = 4, // 酒店
  Comment = 5, // 評論
  Edit = 6, // 編輯
  Delete = 7, // 刪除
  Report = 8, // 檢舉
  Block = 9, // 封鎖
}
type MenuItem = {
  id: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  rightIcon?: React.ReactNode;
};

enum ReviewStatus {
  Approved = 1, // 已通過
  Pending = 2, // 審核中
  Rejected = 3, // 未通過
}

type ReviewItem = {
  id: string;
  name: string;
  status: ReviewStatus;
  categoryType: BusinessCategory;
  venueId?: string | null; // 已通過店家才有店家id
};

type Tag = {
  tagIcon?: React.ReactNode;
  tagLabel?: string;
  value: string;
};

// 通知類型
enum NotificationType {
  Review = 1, // 評論
  Announcement = 2, // 公告
}

// 通用 API 回應格式
export interface StringResultModel {
  id: string;
  data: string;
}

type Notification = {
  id: string; // 通知ID
  title: string; // 通知標題
  subTitle: string;
  payload?: {
    targetId: string; // 如果是公告的話, 就會有 targetId
  } | null;
  type: NotificationType; // 通知類型: 1 = 評論, 2 = 公告
  isRead: boolean; // 是否已讀
  updateTime: string;
};

type ActionButtonType = 'info' | 'edit' | 'petInfo' | 'notification';

enum MapWarningIcon {
  AngryPoop = 1, // 怒怒屎
  GrumpyPoop = 2, // 氣氣屎
}

enum TaiwanCities {
  Taipei = 1,
  NewTaipei = 2,
  Taoyuan = 3,
  Hsinchu = 4,
  Miaoli = 5,
  Taichung = 6,
  Changhua = 7,
  Nantou = 8,
  Yunlin = 9,
  Chiayi = 10,
  Tainan = 11,
  Kaohsiung = 12,
  Pingtung = 13,
  Yilan = 14,
  Hualien = 15,
  Taitung = 16,
  Penghu = 17,
  Kinmen = 18,
  Matsu = 19,
}

type ImageType = {
  value: string | number;
  title: string;
  subtitle: string;
  image: string;
};

export {
  User,
  UserStatus,
  PetFriendlyLevel,
  Feedback,
  BusinessCategory,
  CommentItem,
  ActionCategory,
  HonestGuide,
  MenuItem,
  ReviewItem,
  Tag,
  Venue,
  VenueApiResponse,
  Location,
  RatingSummary,
  RatingStats,
  RatingDistribution,
  BusinessStatus,
  BusinessActions,
  DailyOpeningHours,
  OpeningPeriod,
  Notification,
  ActionButtonType,
  PartnerType,
  UserGenderType,
  FeedbackType,
  MapWarningIcon,
  TaiwanCities,
  ReviewStatus,
  NotificationType,
  ImageType,
  PetFriendlyLevelAll,
  FeedbackTypeAll,
};
