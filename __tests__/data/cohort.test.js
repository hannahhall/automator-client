import '@testing-library/jest-dom';
import axios from 'axios';

import { fetchCohorts } from '../../data/cohort';
const API_BASE = 'http://localhost:8000';

jest.mock('axios');

describe('Cohort Data', () => {
  it('should make a get request when fetchCohorts is called', () => {
    const url = API_BASE + '/api/cohorts';
    fetchCohorts();
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});
