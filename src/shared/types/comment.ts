// Comment type definitions - 與 React Native App 同步

import { Venue } from './venue';

// Enums
export enum GenderType {
  Male = 1, // 男
  Female = 2, // 女
  Secret = 3, // 秘密
}

export enum PartnerType {
  Dog = 1, // 狗
  Cat = 2, // 貓
}

export enum PetType {
  Dog = 1,
  Cat = 2,
}

export enum NeuteredType {
  Yes = 1, // 已絕育
  No = 2, // 未絕育
}

export enum GrowthStatus {
  Puppy = 1, // 幼年
  Adult = 2, // 成年
  Senior = 3, // 老年
}

export enum FeedbackType {
  Positive = 1, // 抓抓 (好評)
  Negative = 2, // 便便 (負評)
}

export enum PetFriendlyLevel {
  Low = 1, // 低 - 1顆心
  Medium = 2, // 中 - 2顆心
  High = 3, // 高 - 3顆心
}

// Interfaces
export interface Reviewer {
  userId: string;
  name: string;
  genderType: GenderType;
  partnerType: PartnerType;
}

export interface PetInfo {
  name: string;
  petType: PetType;
  breed: string;
  genderType: GenderType;
  neuteredType: NeuteredType;
  growthStatus: GrowthStatus;
}

export interface Feedback {
  type: FeedbackType; // 1: 抓抓, 2: 便便
  rating: number; // 評分 0-5
}

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  s3Bucket: string;
  s3Key: string;
  url: string;
  uploadDate: string;
  uploadedBy: string;
  filePurpose: number;
  mediaType: number;
  usageType: number;
  description?: string;
  isDeleted: boolean;
  lastAccessed?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Comment {
  id: string;
  reviewer: Reviewer;
  venue: Venue;
  petInfo: PetInfo;
  petFriendlyLevel: PetFriendlyLevel;
  feedback: Feedback;
  content: string;
  files: FileInfo[];
  updateTime: string;
}

export interface CommentListResponse {
  items: Comment[];
  total: number;
}

export interface RelatedCommentsResponse {
  items: Comment[];
  total: number;
}
