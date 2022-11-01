import axios, { AxiosResponse } from 'axios';
import makeUrl from '.';
import { Tech } from '../interfaces';

export const fetchTechs = (): Promise<AxiosResponse> => {
  const url = makeUrl('/api/techs');
  return axios.get(url);
};

export const createTech = (tech: Tech, token: string): Promise<AxiosResponse> => {
  const url = makeUrl('/api/techs');
  return axios.post(url, tech, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateTech = (id: number, tech: Tech, token: string): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/techs/${id}`);
  return axios.put(url, tech, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
