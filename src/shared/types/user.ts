// User type definitions - 與 React Native App 同步

export interface User {
  id: string;
  name: string;
  avatar: string;
  commentCount?: number;
}

export interface UserProfile extends User {
  commentCount: number;
  createdAt?: string;
}
