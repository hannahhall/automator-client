import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthorizedNav from '../../../components/navbar/authorized-nav';

jest.mock("next/link", () => {
  return ({ children }) => {
    return children;
  }
});

describe('Authorized Nav Items', () => {
  it('renders a logout button', () => {
    render(
      <AuthorizedNav />
    );

    const logoutButton = screen.getByText('Logout');

    expect(logoutButton).toBeInTheDocument();
  });

  it('calls the logout function when logout is clicked', async () => {
    const user = userEvent.setup();
    const mockLogoutFn = jest.fn();
    render(
      <AuthorizedNav logout={mockLogoutFn} />
    );

    await user.click(screen.getByText('Logout'));

    expect(mockLogoutFn.mock.calls.length).toBe(1);
  });

  it('routes to the Create Program page', async () => {
    render(
      <AuthorizedNav />
    );

    const link = screen.getByText('Create Program');

    expect(link.href).toContain('/programs/create')
  });
});
