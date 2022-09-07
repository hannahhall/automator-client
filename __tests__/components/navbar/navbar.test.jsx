import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../../../components/navbar/navbar';
import { AuthContext } from '../../../hooks/useAuth';

let mockIsAuthenticated = false;

const mockValue = {
  getIsAuthenticated: jest.fn(() => mockIsAuthenticated),
  logout: jest.fn(),
};

describe('Navbar', () => {
  it('renders', () => {

    render(
      <AuthContext.Provider value={mockValue}>
        <Navbar />
      </AuthContext.Provider>
    );

    const header = screen.getByText('Automator');

    expect(header).toBeInTheDocument();
  });

  it('shows the logout button when user is authenticated', () => {
    mockIsAuthenticated = true;
    render(
      <AuthContext.Provider value={mockValue}>
        <Navbar />
      </AuthContext.Provider>
    );

    const logoutBtn = screen.queryByText('Logout');
    const loginBtn = screen.queryByText('Log In');

    expect(logoutBtn).toBeInTheDocument();
    expect(loginBtn).toBeNull();
  });

  it('shows the logout button when user is authenticated', () => {
    mockIsAuthenticated = false;
    render(
      <AuthContext.Provider value={mockValue}>
        <Navbar />
      </AuthContext.Provider>
    );

    const logoutBtn = screen.queryByText('Logout');
    const loginBtn = screen.queryByText('Log In');

    expect(logoutBtn).toBeNull();
    expect(loginBtn).toBeInTheDocument();
  })
});
