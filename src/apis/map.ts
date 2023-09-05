import axios from './index';

export const getDiveLogsMap = async (
  latitude: number,
  longitude: number,
  sideLength: number,
  search: string | null,
) => {
  const res = await axios.get(
    `/hondi/divelogs/map?latitude=${latitude}&longitude=${longitude}&sideLength=${sideLength}&q=${search}`,
  );
  return res;
};
