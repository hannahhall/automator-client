import '@testing-library/jest-dom';
import axios from 'axios';

import { fetchProjects, createProject, updateProject, fetchProject, deleteProject } from '../../data/project';
const API_BASE = 'http://localhost:8000';

jest.mock('axios');

describe('Project Data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a get request when fetchProjects is called', () => {
    const url = API_BASE + '/api/projects';
    const token = '12345'
    fetchProjects(token);
    expect(axios.get).toHaveBeenCalledWith(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  });

  it('should make a get request when fetchProject is called', () => {
    const id = 1;
    const token = '12345';
    const url = API_BASE + '/api/projects/' + id;
    fetchProject(id, token);
    expect(axios.get).toHaveBeenCalledWith(url, { 'headers': { 'Authorization': `Bearer ${token}` } }
    );
  });

  it('should make a post request when createProject is called', () => {
    const url = API_BASE + '/api/projects';
    const data = {
      title: 'New Project',
    };
    const token = 'test1234';
    createProject(data, token);
    expect(axios.post).toHaveBeenCalledWith(
      url,
      data,
      { 'headers': { 'Authorization': `Bearer ${token}` } }
    );

  });
  it('should make a put request when updateProject is called', () => {
    const data = {
      id: 1,
      title: 'New Project',
    };
    const url = API_BASE + '/api/projects/' + data.id;
    const token = 'test1234';
    updateProject(data, token);
    expect(axios.put).toHaveBeenCalledWith(
      url,
      data,
      { 'headers': { 'Authorization': `Bearer ${token}` } }
    );
  });

  it('should make a delete request when deleteProject is called', () => {
    const projectId = 1;
    const token = 'test1234';
    const url = `${API_BASE}/api/projects/${projectId}`;
    deleteProject(projectId, token);
    expect(axios.delete).toHaveBeenCalledWith(
      url,
      { 'headers': { 'Authorization': `Bearer ${token}` } }
    );
  });
});
