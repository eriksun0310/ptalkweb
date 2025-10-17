// Comment type definitions - 與 React Native App 同步

import { User } from './user';
import { Venue } from './venue';

export interface Comment {
  id: string;
  content: string;
  rating: number; // 1-5
  feedbackType: 1 | 2; // 1: 抓抓 (好評), 2: 便便 (負評)
  images: string[];
  createdAt: string;
  user: User;
  venue: Venue;
}

export interface CommentListResponse {
  comments: Comment[];
  total: number;
}

export interface RelatedCommentsResponse {
  comments: Comment[];
  total: number;
}
