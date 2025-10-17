// Mock 測試資料 - 用於開發階段顯示 UI

import type { Comment, User, Venue, UserProfile, CommentListResponse, RelatedCommentsResponse } from '@/shared/types';

// Mock 用戶資料
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: '柴犬小黃的主人',
    avatar: 'https://i.pravatar.cc/150?img=1',
    commentCount: 23,
  },
  {
    id: 'user2',
    name: '貓咪咪咪麻',
    avatar: 'https://i.pravatar.cc/150?img=5',
    commentCount: 15,
  },
  {
    id: 'user3',
    name: 'Golden毛孩爸',
    avatar: 'https://i.pravatar.cc/150?img=12',
    commentCount: 8,
  },
];

// Mock 店家資料
export const mockVenues: Venue[] = [
  {
    id: 'venue1',
    name: '貓狗好朋友咖啡廳',
    address: '台北市大安區和平東路二段 123 號',
    rating: 4.8,
    reviewCount: 127,
    mainImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
  },
  {
    id: 'venue2',
    name: '毛小孩寵物餐廳',
    address: '台北市信義區信義路五段 7 號',
    rating: 4.5,
    reviewCount: 89,
    mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
  },
];

// Mock 評論資料
export const mockComments: Comment[] = [
  {
    id: 'comment1',
    content: '店家超友善！服務生主動問有沒有需要水碗，還準備了狗狗零食。環境乾淨舒適，有專門的寵物區域，小黃玩得很開心。餐點也很好吃，推薦他們的義大利麵和提拉米蘇！',
    rating: 5.0,
    feedbackType: 1,
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581888227599-779811939961?w=600&h=600&fit=crop',
    ],
    createdAt: '2024-01-15T10:30:00Z',
    user: mockUsers[0],
    venue: mockVenues[0],
  },
  {
    id: 'comment2',
    content: '帶咪咪來用餐，店員很親切。有提供貓咪專用座椅，咪咪可以坐在旁邊一起用餐。但是人多的時候有點吵，咪咪有點緊張。建議平日來會比較舒適。',
    rating: 4.0,
    feedbackType: 1,
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=600&fit=crop',
    ],
    createdAt: '2024-01-14T14:20:00Z',
    user: mockUsers[1],
    venue: mockVenues[0],
  },
  {
    id: 'comment3',
    content: '環境不錯，但是空間有點小。我的 Golden 體型比較大，坐起來有點擠。希望能有更大的活動空間。餐點普通，價格偏高。',
    rating: 3.0,
    feedbackType: 2,
    images: [
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=600&fit=crop',
    ],
    createdAt: '2024-01-13T16:45:00Z',
    user: mockUsers[2],
    venue: mockVenues[0],
  },
  {
    id: 'comment4',
    content: '第二次來了！真的很喜歡這裡的氛圍。店員記得我們，還記得小黃的名字，超貼心。今天點了新的套餐，一樣好吃。',
    rating: 5.0,
    feedbackType: 1,
    images: [],
    createdAt: '2024-01-12T11:00:00Z',
    user: mockUsers[0],
    venue: mockVenues[0],
  },
  {
    id: 'comment5',
    content: '很棒的寵物友善餐廳！有戶外座位區，天氣好的時候很舒服。小黃可以自由活動，其他客人的狗狗也很友善。',
    rating: 4.5,
    feedbackType: 1,
    images: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&h=600&fit=crop',
    ],
    createdAt: '2024-01-11T13:30:00Z',
    user: mockUsers[0],
    venue: mockVenues[1],
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

  return {
    comments: related,
    total: comment.venue.reviewCount - 1,
  };
}

// Mock 函數：取得用戶資料
export function getMockUser(id: string): UserProfile {
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];
  return {
    ...user,
    commentCount: user.commentCount || 0,
  };
}

// Mock 函數：取得用戶評論列表
export function getMockUserComments(userId: string, limit: number = 10): CommentListResponse {
  const userComments = mockComments.filter(c => c.user.id === userId).slice(0, limit);
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0];

  return {
    comments: userComments,
    total: user.commentCount || userComments.length,
  };
}
