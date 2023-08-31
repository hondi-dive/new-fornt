import axios from './index';
import { IFeed } from '@/types/feed';

interface Props {
  address?: string | null;
  type?: string;
}

export const fetchDiveLogsFeed = async ({ address, type }: Props) => {
  if (address) {
    const res = await axios.get<null, IFeed[]>(
      `/hondi/divelogs/feeds?address=${address}&type=${type}`,
    );
    return res;
  } else {
    const res = await axios.get<null, IFeed[]>(`/hondi/divelogs/feeds?type=${type}`);
    return res;
  }
};

export const fetchDiveLogsIsLiked = async (diveLogId: string) => {
  const res: boolean = await axios.get(`/hondi/divelogs/${diveLogId}/is_liked`);
  return res;
};
