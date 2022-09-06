import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthorizedNav from '../../../components/navbar/authorized-nav';

describe('Authorized Nav Items', () => {
    it('renders a logout button', () => {
        const mockLogoutFn = jest.fn();
        render(
            <AuthorizedNav logout={mockLogoutFn} />
        );

        const logoutButton = screen.getByText('Logout');

        expect(logoutButton).toBeInTheDocument();
        logoutButton.simulate('click');
        expect(mockLogoutFn.length).toBe(1)
    });
});
