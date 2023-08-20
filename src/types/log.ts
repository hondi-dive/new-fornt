export type LogData = {
  place: string;
  date: string;
  type: 'scuba' | 'free' | 'snorkeling';
  satisfaction: 0 | 1 | 2 | 3 | 4 | 5;
  hashTag: string[];
  comment: string;
};
