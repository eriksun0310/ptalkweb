// Mock 測試資料 - 用於開發階段顯示 UI

import type { Comment, Venue, CommentListResponse, RelatedCommentsResponse, Reviewer } from '@/shared/types';
import {
  GenderType,
  PartnerType,
  PetType,
  NeuteredType,
  GrowthStatus,
  FeedbackType,
  PetFriendlyLevel,
  CategoryType,
} from '@/shared/types';
import { getAvatarSource } from './avatar';

// Mock 評論者資料
export const mockReviewers: Reviewer[] = [
  {
    userId: 'user1',
    name: 'yu',
    genderType: GenderType.Female,
    partnerType: PartnerType.Dog,
  },
  {
    userId: 'user2',
    name: '貓咪咪咪麻',
    genderType: GenderType.Female,
    partnerType: PartnerType.Cat,
  },
  {
    userId: 'user3',
    name: 'Golden毛孩爸',
    genderType: GenderType.Male,
    partnerType: PartnerType.Dog,
  },
];

// Mock 店家資料
export const mockVenues: Venue[] = [
  {
    id: 'venue1',
    name: 'Deli Puppy 寵物友善餐廳',
    categoryType: CategoryType.Restaurant,
    location: {
      lat: 25.033,
      lng: 121.5654,
    },
    address: '高雄市 三民區 高雄市三民區明吉路 11 號',
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop'],
    openingHours: [],
    ratingSummary: {
      positive: { rating: 4.0, count: 1 },
      negative: { rating: 0.0, count: 0 },
      distribution: {
        positive: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 1 },
        negative: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      },
    },
    status: { open: true, openingTime: '11:00' },
    actions: { edit: false, bookmark: true },
  } as Venue,
  {
    id: 'venue2',
    name: '貓狗好朋友咖啡廳',
    categoryType: CategoryType.Cafe,
    location: {
      lat: 25.033,
      lng: 121.5654,
    },
    address: '台北市大安區和平東路二段 123 號',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'],
    openingHours: [],
    ratingSummary: {
      positive: { rating: 4.8, count: 127 },
      negative: { rating: 0, count: 0 },
      distribution: {
        positive: { '1': 0, '2': 0, '3': 5, '4': 22, '5': 100 },
        negative: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      },
    },
    status: { open: true, openingTime: '09:00' },
    actions: { edit: false, bookmark: true },
  } as Venue,
];

// Mock 評論資料
export const mockComments: Comment[] = [
  {
    id: 'comment1',
    reviewer: mockReviewers[0],
    venue: mockVenues[0],
    petInfo: {
      name: '馬爾濟斯',
      petType: PetType.Dog,
      breed: '馬爾濟斯',
      genderType: GenderType.Male,
      neuteredType: NeuteredType.Yes,
      growthStatus: GrowthStatus.Adult,
    },
    petFriendlyLevel: PetFriendlyLevel.High,
    feedback: {
      type: FeedbackType.Positive,
      rating: 5.0,
    },
    content: '會不會看起來太好吃❤️',
    files: [
      {
        id: 'file1',
        name: 'puppy1.jpg',
        type: 'image/jpeg',
        size: 1024000,
        s3Bucket: 'ptalk-images',
        s3Key: 'comments/puppy1.jpg',
        url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
        uploadDate: '2025-10-16T00:00:00Z',
        uploadedBy: 'user1',
        filePurpose: 1,
        mediaType: 1,
        usageType: 1,
        isDeleted: false,
        createdAt: '2025-10-16T00:00:00Z',
        createdBy: 'user1',
        updatedAt: '2025-10-16T00:00:00Z',
        updatedBy: 'user1',
      }, {
        id: 'file1',
        name: 'puppy1.jpg',
        type: 'image/jpeg',
        size: 1024000,
        s3Bucket: 'ptalk-images',
        s3Key: 'comments/puppy1.jpg',
        url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
        uploadDate: '2025-10-16T00:00:00Z',
        uploadedBy: 'user1',
        filePurpose: 1,
        mediaType: 1,
        usageType: 1,
        isDeleted: false,
        createdAt: '2025-10-16T00:00:00Z',
        createdBy: 'user1',
        updatedAt: '2025-10-16T00:00:00Z',
        updatedBy: 'user1',
      }, {
        id: 'file1',
        name: 'puppy1.jpg',
        type: 'image/jpeg',
        size: 1024000,
        s3Bucket: 'ptalk-images',
        s3Key: 'comments/puppy1.jpg',
        url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
        uploadDate: '2025-10-16T00:00:00Z',
        uploadedBy: 'user1',
        filePurpose: 1,
        mediaType: 1,
        usageType: 1,
        isDeleted: false,
        createdAt: '2025-10-16T00:00:00Z',
        createdBy: 'user1',
        updatedAt: '2025-10-16T00:00:00Z',
        updatedBy: 'user1',
      },
    ],
    updateTime: '2025-10-16T00:00:00Z',
  },
  {
    id: 'comment2',
    reviewer: mockReviewers[1],
    venue: mockVenues[1],
    petInfo: {
      name: '咪咪',
      petType: PetType.Cat,
      breed: '混種貓',
      genderType: GenderType.Female,
      neuteredType: NeuteredType.Yes,
      growthStatus: GrowthStatus.Adult,
    },
    petFriendlyLevel: PetFriendlyLevel.Medium,
    feedback: {
      type: FeedbackType.Positive,
      rating: 4.0,
    },
    content: '帶咪咪來用餐，店員很親切。有提供貓咪專用座椅，咪咪可以坐在旁邊一起用餐。但是人多的時候有點吵，咪咪有點緊張。建議平日來會比較舒適。',
    files: [
      {
        id: 'file2',
        name: 'cat1.jpg',
        type: 'image/jpeg',
        size: 1024000,
        s3Bucket: 'ptalk-images',
        s3Key: 'comments/cat1.jpg',
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
        uploadDate: '2024-01-14T14:20:00Z',
        uploadedBy: 'user2',
        filePurpose: 1,
        mediaType: 1,
        usageType: 1,
        isDeleted: false,
        createdAt: '2024-01-14T14:20:00Z',
        createdBy: 'user2',
        updatedAt: '2024-01-14T14:20:00Z',
        updatedBy: 'user2',
      },
      {
        id: 'file3',
        name: 'cat2.jpg',
        type: 'image/jpeg',
        size: 1024000,
        s3Bucket: 'ptalk-images',
        s3Key: 'comments/cat2.jpg',
        url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=600&fit=crop',
        uploadDate: '2024-01-14T14:20:00Z',
        uploadedBy: 'user2',
        filePurpose: 1,
        mediaType: 1,
        usageType: 1,
        isDeleted: false,
        createdAt: '2024-01-14T14:20:00Z',
        createdBy: 'user2',
        updatedAt: '2024-01-14T14:20:00Z',
        updatedBy: 'user2',
      },
    ],
    updateTime: '2024-01-14T14:20:00Z',
  },
  {
    id: 'comment3',
    reviewer: mockReviewers[2],
    venue: mockVenues[1],
    petInfo: {
      name: 'Golden',
      petType: PetType.Dog,
      breed: '黃金獵犬',
      genderType: GenderType.Male,
      neuteredType: NeuteredType.No,
      growthStatus: GrowthStatus.Adult,
    },
    petFriendlyLevel: PetFriendlyLevel.Low,
    feedback: {
      type: FeedbackType.Negative,
      rating: 3.0,
    },
    content: '環境不錯，但是空間有點小。我的 Golden 體型比較大，坐起來有點擠。希望能有更大的活動空間。餐點普通，價格偏高。',
    files: [
      {
        id: 'file4',
        name: 'golden1.jpg',
        type: 'image/jpeg',
        size: 1024000,
        s3Bucket: 'ptalk-images',
        s3Key: 'comments/golden1.jpg',
        url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=600&fit=crop',
        uploadDate: '2024-01-13T16:45:00Z',
        uploadedBy: 'user3',
        filePurpose: 1,
        mediaType: 1,
        usageType: 1,
        isDeleted: false,
        createdAt: '2024-01-13T16:45:00Z',
        createdBy: 'user3',
        updatedAt: '2024-01-13T16:45:00Z',
        updatedBy: 'user3',
      },
    ],
    updateTime: '2024-01-13T16:45:00Z',
  },
];

// Mock 函數：取得單則評論
export function getMockComment(id: string): Comment {
  return mockComments.find(c => c.id === id) || mockComments[0];
}

// Mock 函數：取得相關評論
export function getMockRelatedComments(commentId: string, limit: number = 5): RelatedCommentsResponse {
  const comment = getMockComment(commentId);
  const related = mockComments
    .filter(c => c.id !== commentId && c.venue.id === comment.venue.id)
    .slice(0, limit);

  const totalCount = (comment.venue.ratingSummary?.positive?.count || 0) + (comment.venue.ratingSummary?.negative?.count || 0) - 1;

  return {
    items: related,
    totalCount,
    pageCount: null,
    currentPage: 1,
    pageSize: limit,
  };
}

// Mock 函數：取得評論者資料
export function getMockReviewer(userId: string): Reviewer {
  return mockReviewers.find(r => r.userId === userId) || mockReviewers[0];
}

// Mock 函數：取得用戶資料（用於用戶頁面）
export function getMockUser(userId: string) {
  const reviewer = getMockReviewer(userId);
  const userComments = mockComments.filter(c => c.reviewer.userId === userId);

  return {
    ...reviewer,
    commentCount: userComments.length,
    avatar: getAvatarSource({
      genderType: reviewer.genderType,
      partnerType: reviewer.partnerType,
    }),
  };
}

// Mock 函數：取得用戶評論列表
export function getMockUserComments(userId: string, limit: number = 10): CommentListResponse {
  const userComments = mockComments.filter(c => c.reviewer.userId === userId).slice(0, limit);

  return {
    items: userComments,
    totalCount: userComments.length,
    pageCount: null,
    currentPage: 1,
    pageSize: limit,
  };
}

// Mock 函數：取得店家資料
export function getMockVenue(venueId: string): Venue {
  return mockVenues.find(v => v.id === venueId) || mockVenues[0];
}

// Mock 函數：取得店家的所有評論
export function getMockVenueComments(venueId: string, limit: number = 20): CommentListResponse {
  const venueComments = mockComments.filter(c => c.venue.id === venueId).slice(0, limit);

  return {
    items: venueComments,
    totalCount: venueComments.length,
    pageCount: null,
    currentPage: 1,
    pageSize: limit,
  };
}
