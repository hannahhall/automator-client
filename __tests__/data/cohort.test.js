import '@testing-library/jest-dom';
import axios from 'axios';

import { createCohort, fetchCohorts } from '../../data/cohort';
const API_BASE = 'http://localhost:8000';

jest.mock('axios');

describe('Cohort Data', () => {
  it('should make a get request when fetchCohorts is called', () => {
    const url = API_BASE + '/api/cohorts';
    fetchCohorts();
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should make a post request to create the cohort', () => {
    const url = API_BASE + '/api/cohorts';
    const cohort = {
      name: 'Day Cohort 13'
    };
    const githubToken = '12345';
    const accessToken = '67890';
    createCohort(cohort, accessToken, githubToken);
    expect(axios.post).toBeCalledWith(
      url,
      { github_access: githubToken, ...cohort },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  });
});
