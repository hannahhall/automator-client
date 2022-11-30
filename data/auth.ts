import axios, { AxiosResponse } from 'axios';

import makeUrl from '.';
import { TUserForm, TStudentForm } from '../interfaces';

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

export const fetchStudent = (token: string, expand = true): Promise<AxiosResponse> => {
  let url: string;
  if (expand) {
    url = makeUrl('/api/users/student?expand');
  } else {
    url = makeUrl('/api/users/student');
  }
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

export const updateStudent = (student: TStudentForm, token: string): Promise<AxiosResponse> => {
  const url = makeUrl('/api/users/student-update');
  return axios.put(url, student, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchGithubAuth = (code: string) => {
  const url = makeUrl(`/api/github-auth?code=${code}`);
  return axios.get(url);
};
