import { render, screen } from '@testing-library/react';
import Login from '../../pages/login';
import { AuthProvider } from '../../hooks/useAuth';
import '@testing-library/jest-dom';

jest.mock('next/router', () => require('next-router-mock'));
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
});
