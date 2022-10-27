import axios, { AxiosResponse } from 'axios';
import makeUrl from '.';
import { Program } from '../interfaces';

export const fetchPrograms = (): Promise<AxiosResponse> => {
  const url = makeUrl('/api/programs');
  return axios.get(url);
};

export const fetchProgram = (id: string): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/programs/${id}`);
  return axios.get(url);
};

export const createProgram = (program: Program, token: string): Promise<AxiosResponse> => {
  const url = makeUrl('/api/programs');
  return axios.post(url, program, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProgram = (program: Program, token: string): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/programs/${program.id}`);
  return axios.put(url, program, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
