import axios from './index';

export const fetchDiveLogsDetail = async (diveLogId: string) => {
  const res = await axios.get(`/hondi/divelogs/${diveLogId}`);
  return res;
};

export const fetchTogglePublic = async (diveLogId: string) => {
  const res = await axios.patch(`/hondi/divelogs/${diveLogId}`);
  return res;
};

export const fetchCreateDiveLogs = async (data: FormData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await axios.post('/hondi/divelogs', data, config);
  return res;
};

export const fetchDiveLogsLike = async (diveLogId: string) => {
  const res = await axios.post(`/hondi/divelogs/${diveLogId}/like`);
  return res;
};

export const fetchCreateComment = async (data: { divelogId: number; content: string }) => {
  const res = await axios.post(`/hondi/comment`, data);
  return res;
};

export const fetchCheckMyDiveLog = async (diveLogId: string) => {
  const res = await axios.get(`/hondi/users/divelogs/${diveLogId}/is_mine`);
  return res;
};

export const fetchMyDiveLog = async () => {
  const res = await axios.get(`/hondi/users/divelogs/my`);
  return res;
};

export const fetchLikeDiveLog = async () => {
  const res = await axios.get(`/hondi/users/divelogs/like`);
  return res;
};

export const fetchCommentedDiveLog = async () => {
  const res = await axios.get(`/hondi/users/divelogs/commented`);
  return res;
};

export const fetchUserDetail = async () => {
  const res = await axios.get(`/hondi/users/detail`);
  return res;
};
