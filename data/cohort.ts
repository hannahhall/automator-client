import axios, { AxiosResponse } from 'axios';
import { TCohort } from '../interfaces/index';
import makeUrl from '.';

export const fetchCohorts = (query: string = null): Promise<AxiosResponse> => {
  let url: string;
  if (query) {
    url = makeUrl(`/api/cohorts?name=${query}`);
  } else {
    url = makeUrl('/api/cohorts');
  }
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
