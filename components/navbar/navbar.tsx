import { useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthorizedNav from './authorized-nav';
import NavbarLink from './navbarLink';
import UnauthorizedNav from './unauthorized-nav';

function Navbar() {
  const { getIsAuthenticated, logout, getUser } = useAuth();
  const navbarMenuEl = useRef<HTMLDivElement>();
  const openMenu = () => {
    navbarMenuEl.current.classList.toggle('is-active');
  };

  return (
    <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavbarLink href="/" className="navbar-item title m-0">Automator</NavbarLink>

        <button
          type="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarLinks"
          onClick={openMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div id="navbarLinks" className="navbar-menu" ref={navbarMenuEl}>
        {
          getIsAuthenticated()
            ? <AuthorizedNav user={getUser()} logout={logout} />
            : <UnauthorizedNav />
        }
      </div>
    </nav>
  );
}

export default Navbar;
