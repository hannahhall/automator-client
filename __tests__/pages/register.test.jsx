import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Register from '../../pages/register';
import { AuthProvider } from '../../hooks/useAuth';
import userEvent from '@testing-library/user-event';


jest.mock('../../data/auth', () => ({
  fetchUser: jest.fn().mockReturnValue(Promise.resolve({})),
  fetchToken: jest.fn(),
  setAccessToken: jest.fn(),
  setRefreshToken: jest.fn(),
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

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  afterEach(cleanup);

  it('renders a heading', async () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );
    await waitFor(async () => {
      const heading = await screen.findByRole('heading', {
        name: "Register",
      });

      expect(heading).toBeInTheDocument();
    });
  });

  it('should render the expected fields for students', async () => {
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );
    await waitFor(async () => {
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
  });

  it('should render the expected fields for instructors', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    await waitFor(async () => {
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
  });

  it('should update the form values', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );
    await waitFor(async () => {
      const username = 'test';
      const usernameInput = screen.getByLabelText('Username');
      await user.type(usernameInput, username);

      expect(screen.getByRole('form')).toHaveFormValues({
        username: username,
      });
    });
  });

  it('should update the image value', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    await waitFor(async () => {
      const username = 'test';
      const usernameInput = screen.getByLabelText('Username');
      await user.type(usernameInput, username);

      expect(screen.getByRole('form')).toHaveFormValues({
        username: username,
      });
    })
  });

  it('should navigate to the register page on click', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    await waitFor(async () => {
      await user.click(screen.getByText('Cancel'));
      expect(pushMock).toBeCalledWith('/login');
    });
  });
});
