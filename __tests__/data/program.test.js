import '@testing-library/jest-dom';
import axios from 'axios';

import { fetchPrograms, createProgram, updateProgram, fetchProgram, deleteTechFromProgram } from '../../data/program';
const API_BASE = 'http://localhost:8000';

jest.mock('axios');

describe('Program Data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a get request when fetchPrograms is called', () => {
    const url = API_BASE + '/api/programs';
    fetchPrograms();
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should make add a query to the get request when fetchPrograms is called', () => {
    const query = 'test';
    const url = `${API_BASE}/api/programs?name=${query}`;
    fetchPrograms(query);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should make a get request when fetchProgram is called', () => {
    const id = 1;
    const url = API_BASE + '/api/programs/' + id;
    fetchProgram(id);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should make a post request when createProgram is called', () => {
    const url = API_BASE + '/api/programs';
    const data = {
      name: 'Web Dev'
    };
    const token = 'test1234';
    createProgram(data, token);
    expect(axios.post).toHaveBeenCalledWith(
      url,
      data,
      { 'headers': { 'Authorization': `Bearer ${token}` } }
    );

  });
  it('should make a put request when updateProgram is called', () => {
    const data = {
      id: 1,
      name: 'Web Dev'
    };
    const url = API_BASE + '/api/programs/' + data.id;
    const token = 'test1234';
    updateProgram(data, token);
    expect(axios.put).toHaveBeenCalledWith(
      url,
      data,
      { 'headers': { 'Authorization': `Bearer ${token}` } }
    );
  });
  it('should make a delete request when deleteTechFromProgram is called', () => {
    const programId = 1;
    const techId = 3
    const url = `${API_BASE}/api/programs/${programId}/techs/${techId}`;
    const token = 'test1234';
    deleteTechFromProgram(programId, techId, token);
    expect(axios.delete).toHaveBeenCalledWith(
      url,
      { 'headers': { 'Authorization': `Bearer ${token}` } }
    );
  });
});
