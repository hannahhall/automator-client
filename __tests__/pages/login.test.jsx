import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import Login from '../../pages/login';
import { fetchToken } from '../../data/auth';
import { AuthProvider } from '../../hooks/useAuth';
import { mockDataRejection } from '../mocks';

jest.mock('../../data/auth', () => ({
  fetchUser: jest.fn().mockReturnValue(Promise.resolve({})),
  fetchToken: jest.fn(),
  login: jest.fn(),
}));
const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/login' });

describe('Login', () => {
  it('renders a heading', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const heading = screen.getByRole('heading', {
      name: 'Login',
    });

    expect(heading).toBeInTheDocument();
  });

  it('should reroute on successful login', async () => {
    fetchToken.mockReturnValue(Promise.resolve(
      {
        data: {
          access: 'access',
          refresh: 'refresh',
        },
      },
    ));

    const user = userEvent.setup();

    const username = 'username';
    const password = 'password';

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, username);

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, password);

    await user.click(screen.getByText('Submit'));

    expect(pushMock).toBeCalledWith('/');
    expect(await screen.findByText('Logout')).toBeInTheDocument();
  });

  it('should show errors on a login error', async () => {
    const user = userEvent.setup();
    const error = {
      detail: 'No User Found',
    };

    mockDataRejection(fetchToken, error);
    const username = 'username';
    const password = 'password';

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, username);

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, password);

    await user.click(screen.getByText('Submit'));

    expect(await screen.findByText(error.detail)).toBeInTheDocument();
  });
});
