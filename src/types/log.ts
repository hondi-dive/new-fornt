export type DiveType = 'SNORKEL' | 'FREEDIVING' | 'SCUBA';

export type LogData = {
  address: string;
  latitude: number;
  longitude: number;
  diveType: DiveType;
  diveAt: string;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  review: string;
  isPublic: boolean;
  hashTags?: string[];
  approachType?: 'BEATCH' | 'BOAT' | 'ETC';
  surfaceFlow?: 'STRONG' | 'MIDDLE' | 'WEAK';
  deepFlow?: 'STRONG' | 'MIDDLE' | 'WEAK';
  waterTemp?: number;
  temp?: number;
  beforeTank?: number;
  afterTank?: number;
  diveDepth?: number;
  pointDepth?: number;
  diveTime?: number;
  decompressionTime?: number;
  distanceView?: number;
};
