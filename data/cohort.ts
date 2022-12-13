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

export const fetchCohort = (id: string): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/cohorts/${id}`);
  return axios.get(url);
};

export const deleteTechFromCohort = (
  cohortId: number,
  techId: number,
  token: string,
): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/cohorts/${cohortId}/techs/${techId}`);
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteStudentFromCohort = (
  cohortId: number,
  studentId: string,
  token: string,
): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/cohorts/${cohortId}/students/${studentId}`);
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCohort = (cohort: TCohort, token: string): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/cohorts/${cohort.id}`);
  return axios.put(url, cohort, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addCohortWebsite = (
  cohortId: number,
  token: string,
  githubToken: string,
): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/cohorts/${cohortId}/deploy-website`);

  return axios.put(
    url,
    { github_access: githubToken },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
