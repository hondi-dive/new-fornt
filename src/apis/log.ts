import axios from './index';

export const fetchDiveLogsDetail = async (diveLogId: number) => {
  try {
    const res = await axios.get(`/hondi/divelogs/${diveLogId}`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchTogglePublic = async (diveLogId: number) => {
  try {
    const res = await axios.patch(`/hondi/divelogs/${diveLogId}`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchCreateDiveLogs = async (data: FormData) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const res = await axios.post('/hondi/divelogs', data, headers);

    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchDiveLogsLike = async (diveLogId: number) => {
  try {
    const res = await axios.post(`/hondi/divelogs/${diveLogId}/like`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchCreateComment = async (data: { divelogId: number; content: string }) => {
  try {
    const res = await axios.post(`/hondi/comment`, data);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchCheckMyDiveLog = async (diveLogId: number) => {
  try {
    const res = await axios.get(`/hondi/users/divelogs/${diveLogId}/is_mine`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchMyDiveLog = async () => {
  try {
    const res = await axios.get(`/hondi/users/divelogs/my`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchLikeDiveLog = async () => {
  try {
    const res = await axios.get(`/hondi/users/divelogs/like`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchCommentedDiveLog = async () => {
  try {
    const res = await axios.get(`/hondi/users/divelogs/commented`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};

export const fetchUserDetail = async () => {
  try {
    const res = await axios.get(`/hondi/users/detail`);
    return res;
  } catch (error) {
    alert('서버 에러 입니다.');
  }
};
