import axios, { AxiosResponse } from 'axios';

import makeUrl from '.';
import { TUserForm } from '../interfaces';

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

export const fetchStudent = (token: string): Promise<AxiosResponse> => {
  const url = makeUrl('/api/users/student');
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = (user: TUserForm): Promise<AxiosResponse> => {
  const url = makeUrl('/api/register');
  return axios.post(url, user, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
