import { useAuth } from '../../hooks/useAuth';
import AuthorizedNav from './authorized-nav';
import NavbarLink from './navbarLink';
import UnauthorizedNav from './unauthorized-nav';

function Navbar() {
  const { getIsAuthenticated, logout, getUser } = useAuth();
  return (
    <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavbarLink href="/" className="navbar-item title m-0">Automator</NavbarLink>

        <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarLinks">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </div>

      <div id="navbarLinks" className="navbar-menu">
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
