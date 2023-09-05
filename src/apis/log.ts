import { FeedCommentType } from '@/types/feed';
import axios from './index';
import { MyPageLogData } from '@/types/log';

export const deleteDiveLogs = async (diveLogId: string) => {
  const res = await axios.delete(`/hondi/divelogs/${diveLogId}`);
  return res;
};
export const getDiveLogs = async (diveLogId: string) => {
  const res = await axios.get(`/hondi/divelogs/${diveLogId}`);
  return res;
};

export const patchDiveLogs = async (diveLogId: string) => {
  const res = await axios.patch(`/hondi/divelogs/${diveLogId}`);
  return res;
};

export const postDiveLogs = async (data: FormData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await axios.post('/hondi/divelogs', data, config);
  return res;
};

export const postDiveLogsLike = async (diveLogId: string) => {
  const res = await axios.post(`/hondi/divelogs/${diveLogId}/like`);
  return res;
};

export const getComment = async (divelogId: string) => {
  const res: FeedCommentType[] = await axios.get(`/hondi/comment/${divelogId}`);
  return res;
};
export const postComment = async (data: { divelogId: string; content: string }) => {
  const res = await axios.post(`/hondi/comment`, data);
  return res;
};

export const getUsersDiveLogsIsMine = async (diveLogId: string) => {
  const res = await axios.get(`/hondi/users/divelogs/${diveLogId}/is_mine`);
  return res;
};

export const getUsersDiveLogsMy = async () => {
  const res: MyPageLogData[] = await axios.get(`/hondi/users/divelogs/my`);
  return res;
};

export const getUsersDiveLogsLike = async () => {
  const res: MyPageLogData[] = await axios.get(`/hondi/users/divelogs/like`);
  return res;
};

export const getUsersDiveLogsCommented = async () => {
  const res: MyPageLogData[] = await axios.get(`/hondi/users/divelogs/commented`);
  return res;
};

export const getUsersDetail = async () => {
  const res: { id: number; nickName: string; imageUri: string; email: string } = await axios.get(
    `/hondi/users/detail`,
  );
  return res;
};
