import { render, screen } from '@testing-library/react';
import Login from '../../pages/login';
import { AuthProvider } from '../../hooks/useAuth';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { fetchToken } from '../../data/auth';


jest.mock('../../data/auth', () => ({
  fetchUser: jest.fn().mockReturnValue(Promise.resolve({})),
  fetchToken: jest.fn(),
  login: jest.fn(),
}));
const pushMock = jest.fn()
jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: pushMock, pathname: '/login' });

describe('Login', () => {
  it('renders a heading', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const heading = screen.getByRole('heading', {
      name: "Login",
    });

    expect(heading).toBeInTheDocument();
  });

  it('should reroute on successful login', async () => {
    fetchToken.mockReturnValue(Promise.resolve(
      {
        data: {
          access: 'access',
          refresh: 'refresh'
        }
      }
    ));

    const user = userEvent.setup();

    const username = 'username';
    const password = 'password';

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, username);

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, password);

    await user.click(screen.getByText('Submit'));

    expect(pushMock).toBeCalledWith('/');
  });

  it('should navigate to the register page on click', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    await user.click(screen.getByText('Cancel'));
    expect(pushMock).toBeCalledWith('/register');
  });

  xit('should show errors on a login error', async () => {
    try {
      const spy = jest.spyOn(console, 'error')
      spy.mockImplementation(() => { })
      const user = userEvent.setup();
      const errorResponse = {
        response: {
          data: {
            detail: 'No User Found'
          }
        }
      }

      fetchToken.mockReturnValue(Promise.reject(
        errorResponse
      ));

      const username = 'username';
      const password = 'password';

      render(
        <AuthProvider>
          <Login />
        </AuthProvider>
      );

      const usernameInput = screen.getByLabelText('Username');
      await user.type(usernameInput, username);

      const passwordInput = screen.getByLabelText('Password');
      await user.type(passwordInput, password);

      await user.click(screen.getByText('Submit'))
      await expect(fetchData('react')).rejects.toThrow(errorMessage);

      expect(screen.getByText(errorResponse.response.data.detail)).toBeInTheDocument()
      spy.mockRestore()
    } catch (e) {
      console.log(e)
    }
  });
});
