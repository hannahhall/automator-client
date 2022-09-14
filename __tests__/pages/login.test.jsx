import { render, screen, waitFor } from '@testing-library/react';
import Login from '../../pages/login';
import { AuthProvider } from '../../hooks/useAuth';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';

jest.mock('next/router', () => require('next-router-mock'));
const pushMock = jest.fn()
const router = jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push: pushMock });

describe('Login', () => {
  afterEach(() => {
    mockAxios.reset();
  });
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
    const user = userEvent.setup();

    const username = 'username';
    const password = 'password';

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );


    mockAxios.get.mockResolvedValueOnce({
      data: {
        access: 'token1',
        refresh: 'token2'
      }
    });
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, username);

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, password);

    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(pushMock.mock.calls.length).toBe(1);
    });


  });
});
