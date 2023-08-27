import axios from './index';

export const fetchMap = async (latitude: number, longitude: number, sideLength: number | null) => {
  const res = await axios.get(
    `/hondi/divelogs/map?latitude=${latitude}&longitude=${longitude}&sideLength=${sideLength}`,
  );
  return res;
};
