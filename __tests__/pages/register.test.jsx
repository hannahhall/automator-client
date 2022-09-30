import { render, screen } from '@testing-library/react';
import Register from '../../pages/register';
import { AuthProvider } from '../../hooks/useAuth';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { fetchToken } from '../../data/auth';


jest.mock('../../data/auth', () => ({
  fetchUser: jest.fn().mockReturnValue(Promise.resolve({})),
  fetchToken: jest.fn(),
  setAccessToken: jest.fn(),
  setRefreshToken: jest.fn(),
}));

jest.mock('../../data/cohort', () => ({
  fetchCohorts: jest.fn().mockReturnValue(Promise.resolve({
    data: [{
      id: 1,
      name: 'Cohort 13'
    }]
  })),
}));
const pushMock = jest.fn()
jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: pushMock, pathname: '/register' });

describe('Register', () => {
  it('renders a heading', () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const heading = screen.getByRole('heading', {
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

    expect(screen.getByRole('form')).toHaveFormValues({
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
    const username = 'test';
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, username);

    expect(screen.getByRole('form')).toHaveFormValues({
      username: username,
    });
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

    expect(screen.getByRole('form')).toHaveFormValues({
      username: username,
    });
  });

  it('should navigate to the register page on click', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    await user.click(screen.getByText('Cancel'));
    expect(pushMock).toBeCalledWith('/login');
  });
});
