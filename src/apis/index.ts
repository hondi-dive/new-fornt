import Axios, { AxiosInstance } from 'axios';

export const createApi = (): AxiosInstance => {
  const customAxios = Axios.create({
    baseURL: 'https://api.hondidive.site',
    withCredentials: true,
  });

  customAxios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response.data);
    },

    async (error) => {
      return Promise.reject(error);
    },
  );

  customAxios.interceptors.request.use((config) => {
    return config;
  });

  return customAxios;
};

const customAxios = createApi();

export default customAxios;
