import '@testing-library/jest-dom';
import axios from 'axios';

import { fetchTechs, createTech } from '../../data/tech';
const API_BASE = 'http://localhost:8000';

jest.mock('axios');

describe('Tech Data', () => {
  it('should make a get request when fetchTechs is called', () => {
    const url = API_BASE + '/api/techs';
    fetchTechs();
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should make a post request when createTech is called', () => {
    const url = API_BASE + '/api/techs';
    const data = {
      name: 'Web Dev'
    };
    const token = 'test1234';
    createTech(data, token);
    expect(axios.post).toHaveBeenCalledWith(
      url,
      data,
      {
        'headers': {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      }
    );
  });
});
