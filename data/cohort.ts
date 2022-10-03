import axios, { AxiosResponse } from 'axios';
import makeUrl from '.';

export const fetchCohorts = (): Promise<AxiosResponse> => {
  const url = makeUrl('/api/cohorts');
  return axios.get(url);
};

export const createCohort = () => {
  // TODO:
};
