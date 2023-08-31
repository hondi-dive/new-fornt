import axios from './index';

interface Props {
  address?: string | null;
  type?: string;
}

export const fetchDiveLogsFeed = async ({ address, type }: Props) => {
  if (address) {
    const res = await axios.get(`/hondi/divelogs/feeds?address=${address}&type=${type}`);
    return res;
  } else {
    const res = await axios.get(`/hondi/divelogs/feeds?type=${type}`);
    return res;
  }
};
