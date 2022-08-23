import axios, { AxiosResponse } from 'axios';

import makeUrl from '.';

export const fetchToken = (username: string, password: string): Promise<AxiosResponse> => {
  const url = makeUrl('/auth/token/');
  return axios.post(url, { username, password });
};

export const fetchNewToken = (refresh): Promise<AxiosResponse> => {
  const url = makeUrl('/auth/token/refresh/');
  return axios.post(url, { refresh });
};

export const fetchUser = (token: string): Promise<AxiosResponse> => {
  const url = makeUrl('/api/users/profile');
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
