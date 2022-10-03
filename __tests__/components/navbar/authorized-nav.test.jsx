import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthorizedNav from '../../../components/navbar/authorized-nav';

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
});
