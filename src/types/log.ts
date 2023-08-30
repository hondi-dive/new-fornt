export type DiveType = 'SNORKEL' | 'FREEDIVING' | 'SCUBA';

export type ScoreType = 0 | 1 | 2 | 3 | 4 | 5;

export type IsPublicType = -1 | 0 | 1;

export type ApproachType = 'BEATCH' | 'BOAT' | 'ETC';

export type SurfaceFlowType = 'STRONG' | 'MIDDLE' | 'WEAK';

export type DeepFlowType = 'STRONG' | 'MIDDLE' | 'WEAK';

export interface LogData {
  address: string;
  latitude: number;
  longitude: number;
  diveType: DiveType;
  diveAt: string;
  score: ScoreType;
  review: string;
  isPublic: IsPublicType;
  hashTags?: string[];
  approachType?: ApproachType;
  surfaceFlow?: SurfaceFlowType;
  deepFlow?: DeepFlowType;
  waterTemp?: number;
  temp?: number;
  beforeTank?: number;
  afterTank?: number;
  diveDepth?: number;
  pointDepth?: number;
  diveTime?: number;
  decompressionTime?: number;
  distanceView?: number;
}

export interface MyPageLogData {
  divelogId: number;
  address: string;
  latitude: Number;
  longitude: Number;
  imageUri: string;
  diveType: DiveType;
  score: ScoreType;
  userId: number;
  likeCnt: number;
}
