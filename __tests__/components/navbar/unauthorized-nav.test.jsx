import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import UnauthorizedNav from '../../../components/navbar/unauthorized-nav';

describe('Unauthorized Nav Items', () => {
  it('renders Register and Login buttons', () => {
    render(
      <UnauthorizedNav />
    );

    const loginElement = screen.getByText('Log In');
    const registerElement = screen.getByText('Register');

    expect(loginElement).toBeInTheDocument();
    expect(registerElement).toBeInTheDocument();
  });
});
