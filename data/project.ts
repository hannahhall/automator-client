import axios, { AxiosResponse } from 'axios';
import makeUrl from '.';
import { Project } from '../interfaces';

export const fetchProjects = (): Promise<AxiosResponse> => {
  const url = makeUrl('/api/projects');
  return axios.get(url);
};

export const fetchProject = (id: string, token: string): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/projects/${id}`);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProject = (project: Project, token: string): Promise<AxiosResponse> => {
  const url = makeUrl('/api/projects');
  return axios.post(url, project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProject = (project: Project, token: string): Promise<AxiosResponse> => {
  const url = makeUrl(`/api/projects/${project.id}`);
  return axios.put(url, project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
