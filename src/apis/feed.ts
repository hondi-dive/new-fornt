import axios from './index';

export const fetchDiveLogsFeed = async (address: string) => {
  try {
    const res = await axios.get(`/hondi/divelogs/feeds?address=${address}`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};
