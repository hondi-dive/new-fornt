import axios from './index';

export const fetchDiveLogsFeed = async (address: string) => {
  const res = await axios.get(`/hondi/divelogs/feeds?address=${address}`);
  return res;
};
