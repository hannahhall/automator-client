import '@testing-library/jest-dom';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import Router from 'next/router';
import userEvent from '@testing-library/user-event';
import Register from '../../pages/register';
import { AuthProvider } from '../../hooks/useAuth';
import { registerUser } from '../../data/auth';

jest.mock('../../data/auth', () => ({
  fetchUser: jest.fn().mockResolvedValue({}),
  fetchToken: jest.fn(),
  registerUser: jest.fn(),
}));

jest.mock('../../data/cohort', () => ({
  fetchCohorts: jest.fn().mockResolvedValue({
    data: [{
      id: 1,
      name: 'Cohort 13',
    }],
  }),
}));

const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/register' });

const fillOutForm = async (user, userValues) => {
  const usernameInput = await screen.findByLabelText('Username');
  await user.type(usernameInput, userValues.username);
  expect(usernameInput).toHaveValue(userValues.username);

  const passwordInput = screen.getByLabelText('Password');
  await user.type(passwordInput, userValues.password);

  const emailInput = screen.getByLabelText('Email');
  await user.type(emailInput, userValues.email);

  const firstNameInput = screen.getByLabelText('First Name');
  await user.type(firstNameInput, userValues.first_name);

  const lastNameInput = screen.getByLabelText('Last Name');
  await user.type(lastNameInput, userValues.last_name);

  const cohortInput = screen.getByLabelText('Select your Cohort');
  await user.selectOptions(cohortInput, userValues.cohort);

  const githubInput = screen.getByLabelText('Github Username');
  await user.type(githubInput, userValues.github_handle);
};

Object.defineProperty(window, 'sessionStorage', {
  value: {
    setItem: jest.fn(),
  },
});

let userValues;

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userValues = {
      username: 'test',
      password: 'password',
      email: 't@t.com',
      first_name: 'Test',
      last_name: 'Test',
      is_staff: 0,
      cohort: '1',
      github_handle: 'github',
      bio: '',
      favorite_quote: '',
      image: undefined,
      linkedin: '',
      podcast_link: '',
      resume_link: '',
    };
  });

  afterEach(cleanup);

  it('renders a heading', async () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>,
    );

    const heading = await screen.findByRole('heading', {
      name: 'Register',
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render the expected fields for students', async () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>,
    );

    expect(await screen.findByRole('form')).toHaveFormValues({
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      is_staff: false,
      github_handle: '',
      linkedin: '',
      resume_link: '',
      podcast_link: '',
      favorite_quote: '',
      bio: '',
      image: '',
    });
  });

  it('should render the expected fields for instructors', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>,
    );

    await user.click(screen.getByLabelText('Register as Instructor?'));
    expect(screen.getByRole('form')).toHaveFormValues({
      is_staff: true,
    });

    expect(screen.queryByLabelText('Select your Cohort')).toBeNull();
  });

  it('should register the user and route to the home page', async () => {
    const response = {
      data: {
        access: 'asdf1234',
        refresh: 'jkl;1234',
      },
    };

    registerUser.mockResolvedValue(response);

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>,
    );

    await fillOutForm(user, userValues);

    const form = await screen.findByRole('form');
    form.submit();
    await waitFor(async () => {
      expect(registerUser).toBeCalledWith(userValues);
      expect(window.sessionStorage.setItem).toBeCalledWith('refresh', response.data.refresh);
      expect(pushMock).toBeCalledWith('/');
    });
  });
});
