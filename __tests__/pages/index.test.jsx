import '@testing-library/jest-dom';
import {
  cleanup, render, screen,
} from '@testing-library/react';
import Router from 'next/router';
import IndexPage from '../../pages/index';
import { AuthProvider } from '../../hooks/useAuth';
import {
  mockDataSuccess,
  mockFetchToken,
} from '../mocks';
import { fetchUser, fetchStudent } from '../../data/auth';
import { fetchProjects } from '../../data/project';
import { fetchPrograms } from '../../data/program';
import { fetchCohorts } from '../../data/cohort';

jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn(),
  fetchStudent: jest.fn(),
}));

jest.mock('../../data/program', () => ({
  fetchPrograms: jest.fn(),
}));

jest.mock('../../data/cohort', () => ({
  fetchCohorts: jest.fn(),
}));

jest.mock('../../data/project', () => ({
  fetchProjects: jest.fn(),
}));

let accessToken;
describe('Index page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      pathname: '/',
    });

    accessToken = '12345';

    mockFetchToken(accessToken);
    mockDataSuccess(fetchProjects, []);
    mockDataSuccess(fetchPrograms, []);
    mockDataSuccess(fetchCohorts, []);
    mockDataSuccess(fetchStudent, {
      first_name: {
        verbose_name: 'First Name',
        value: 'Test',
      },
      last_name: {
        verbose_name: 'Last Name',
        value: 'McTesty',
      },
      circle_image: {
        verbose_name: 'Profile Image',
        value: 'http://test.com',
      },
    });
  });

  afterEach(cleanup);

  it('renders the instructor page', async () => {
    const user = {
      is_staff: true,
    };
    mockDataSuccess(fetchUser, user);
    render(
      <AuthProvider>
        <IndexPage />
      </AuthProvider>,
    );

    expect(await screen.findByText('Programs')).toBeInTheDocument();
  });

  it('renders the student page', async () => {
    const user = {
      is_staff: false,
    };
    mockDataSuccess(fetchUser, user);
    render(
      <AuthProvider>
        <IndexPage />
      </AuthProvider>,
    );

    expect(await screen.findByText('Projects')).toBeInTheDocument();
    expect(await screen.findByText('My Info')).toBeInTheDocument();
  });
});
