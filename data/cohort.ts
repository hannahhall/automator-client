import axios, { AxiosResponse } from 'axios';
import { TCohort } from '../interfaces/index';
import makeUrl from '.';

export const fetchCohorts = (): Promise<AxiosResponse> => {
  const url = makeUrl('/api/cohorts');
  return axios.get(url);
};

export const createCohort = (
  cohort: TCohort,
  token: string,
  githubToken: string,
): Promise<AxiosResponse> => {
  const url = makeUrl('/api/cohorts');
  const data = {
    ...cohort,
    github_access: githubToken,
  };
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
