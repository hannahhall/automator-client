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

jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn(),
  fetchStudent: jest.fn(),
}));

jest.mock('../../data/project', () => ({
  fetchProjects: jest.fn(),
}));

const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({
  push: pushMock,
  pathname: '/',
});

let accessToken;
describe('Index page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    accessToken = '12345';

    mockFetchToken(accessToken);
    mockDataSuccess(fetchStudent, {
      id: 1,
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

    mockDataSuccess(fetchProjects, []);
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
