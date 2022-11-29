import '@testing-library/jest-dom';
import {
  cleanup, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import EditStudent from '../../pages/edit';
import { AuthProvider } from '../../hooks/useAuth';
import { createProject } from '../../data/project';
import {
  mockDataSuccess,
  mockFetchToken,
} from '../mocks';
import { fetchStudent, fetchUser, updateStudent } from '../../data/auth';
import { fetchCohorts } from '../../data/cohort';

jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchStudent: jest.fn(),
  fetchUser: jest.fn(),
  updateStudent: jest.fn(),
}));
jest.mock('../../data/cohort', () => ({
  fetchCohorts: jest.fn(),
}));
const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/edit' });

let accessToken;
let student;
describe('Edit Student', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    accessToken = '12345';
    student = {
      user: {
        first_name: 'Test',
        last_name: 'McTesty',
        email: 'test@test.com',
      },
      github_handle: 'githubUsername',
      cohort: 1,
      image: undefined,
      linkedin: 'linkedinUsername',
      podcast_link: 'http://youtube.com',
      resume_link: 'http://github.com',
      favorite_quote: 'To be or not to be',
      bio: 'My bio',
    };
    mockDataSuccess(fetchStudent, student);
    mockDataSuccess(fetchCohorts, [{ id: 1, name: 'COhort 13' }]);
    mockDataSuccess(fetchUser, student.user);
    mockFetchToken(accessToken);
  });

  afterEach(cleanup);

  it('renders', async () => {
    render(
      <AuthProvider>
        <EditStudent />
      </AuthProvider>,
    );

    const heading = await screen.findByRole('heading', {
      name: 'Edit My Info',
    });

    expect(heading).toBeInTheDocument();
  });

  it('Submits the form', async () => {
    const user = userEvent.setup();
    mockDataSuccess(updateStudent, {});

    render(
      <AuthProvider>
        <EditStudent />
      </AuthProvider>,
    );

    const submitBtn = await screen.findByText('Submit');
    await user.click(submitBtn);

    expect(updateStudent).toBeCalledWith(student, accessToken);
    expect(pushMock).toBeCalledWith('/');
  });
});
