import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../../pages/register';
import { AuthProvider } from '../../hooks/useAuth';
import { registerUser } from '../../data/auth';


jest.mock('../../data/auth', () => ({
  fetchUser: jest.fn().mockResolvedValue({}),
  fetchToken: jest.fn(),
  registerUser: jest.fn()
}));

jest.mock('../../data/cohort', () => ({
  fetchCohorts: jest.fn().mockResolvedValue({
    data: [{
      id: 1,
      name: 'Cohort 13'
    }]
  })
}));

const pushMock = jest.fn()
jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: pushMock, pathname: '/register' });

Object.defineProperty(window, 'sessionStorage', {
  value: {
    setItem: jest.fn()
  }
})

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('renders a heading', async () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const heading = await screen.findByRole('heading', {
      name: "Register",
    });

    expect(heading).toBeInTheDocument();

  });

  it('should render the expected fields for students', async () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
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
      image: ''
    });

  });

  it('should render the expected fields for instructors', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    await user.click(screen.getByText('Register as Instructor?'));
    expect(screen.getByRole('form')).toHaveFormValues({
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      is_staff: true,
      instructor_password: ''
    });
  });

  it('should update the form values', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const userValues = {
      username: 'test'
    };
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, userValues.username);

    expect(screen.getByRole('form')).toHaveFormValues(userValues);

  });

  it('should update the image value', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const username = 'test';
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, username);

    expect(await screen.findByRole('form')).toHaveFormValues({
      username: username,
    });

  });

  it('should navigate to the login page on click', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    await user.click(screen.getByText('Cancel'));
    expect(pushMock).toBeCalledWith('/login');
  });

  it('should register the user and route to the home page', async () => {
    const response = {
      data: {
        access: 'asdf1234',
        refresh: 'jkl;1234'
      }
    };

    registerUser.mockResolvedValue(response)

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const userValues = {
      username: 'test',
      password: 'password',
      email: 't@t.com',
      first_name: 'Test',
      last_name: 'Test',
      is_staff: false
    };
    const usernameInput = await screen.findByLabelText('Username');
    await user.type(usernameInput, userValues.username);
    expect(usernameInput).toHaveValue(userValues.username)

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, userValues.password);

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, userValues.email);

    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, userValues.first_name);

    const lastNameInput = screen.getByLabelText('Last Name');
    await user.type(lastNameInput, userValues.last_name);

    const form = await screen.findByRole('form');
    form.submit()
    await waitFor(async () => {
      expect(registerUser).toBeCalledWith(userValues);
      expect(window.sessionStorage.setItem).toBeCalledWith('refresh', response.data.refresh)
      expect(pushMock).toBeCalledWith('/');
    });
  });

  it('should show errors', async () => {
    const error = 'UserName Error';
    const errorResponse = {
      response: {
        data: {
          username: error
        }
      }
    };

    registerUser.mockImplementation(() => Promise.reject(errorResponse));

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const form = await screen.findByRole('form');
    form.submit();
    expect(await screen.findByText(error)).toBeInTheDocument();
  });
});
