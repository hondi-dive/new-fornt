import axios from './index';

interface Props {
  address?: string | null;
  type?: string;
}

export const fetchDiveLogsFeed = async ({ address, type }: Props) => {
  const res = await axios.get(`/hondi/divelogs/feeds?address=${address}&type=${type}`);
  return res;
};
