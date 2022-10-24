import '@testing-library/jest-dom';
import axios from 'axios';

import { fetchPrograms, createProgram } from '../../data/program';
const API_BASE = 'http://localhost:8000';

jest.mock('axios');

describe('Program Data', () => {
  it('should make a get request when fetchPrograms is called', () => {
    const url = API_BASE + '/api/programs';
    fetchPrograms();
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
});
