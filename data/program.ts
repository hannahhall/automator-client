import axios, { AxiosResponse } from 'axios';
import makeUrl from '.';
import { Program } from '../interfaces';

export const fetchPrograms = (query: string = null): Promise<AxiosResponse> => {
  let url: string;
  if (query) {
    url = makeUrl(`/api/programs?name=${query}`);
  } else {
    url = makeUrl('/api/programs');
  }
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

export const deleteTechFromProgram = (
  programId: number,
  techId: number,
  token: string,
): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/programs/${programId}/techs/${techId}`);
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
