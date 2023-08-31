import { DiveType } from '@/types/log';

export interface IFeed {
  address: string;
  diveType: string;
  divelogId: number;
  imageUri: string;
  latitude: number;
  likeCnt: number;
  longitude: number;
  score: number;
  userId: number;
}

export interface FeedDetailType {
  writer: {
    id: number;
    nickName: string;
    imageUri: string;
    email: string;
  };
  commentCnt: number;
  likeCnt: number;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  diveType: DiveType;
  score: number;
  review: string;
  approachType?: string;
  surfaceFlow?: string;
  deepFlow?: string;
  temp?: number;
  waterTemp?: number;
  beforeTank?: number;
  afterTank?: number;
  diveDepth?: number;
  pointDepth?: number;
  diveAt: string;
  diveTime?: number;
  decompressionTime?: number;
  distanceView: number;
  hashTags?: string[];
}

export type FeedDetailPage = 'feedDetailMain' | 'feedDetailLog';

export interface FeedCommentType {
  id: number;
  user: {
    id: number;
    nickName: string;
    imageUri: string;
    email: string;
  };
  content: string;
  createdAt: null | string;
  modifiedAt: null | string;
}
