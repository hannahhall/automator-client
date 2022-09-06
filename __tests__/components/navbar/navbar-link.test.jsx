import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NavbarLink from '../../../components/navbar/navbarLink';

describe('Navbar Link', () => {
  it('renders a link', () => {
    const props = {
      href: '/route',
      children: 'Page Route'
    };

    render(
      <NavbarLink {...props} />
    );

    const linkElement = screen.getByText(props.children);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.href).toContain(props.href);
    expect(linkElement.className).toContain('navbar-item');
  });
});
