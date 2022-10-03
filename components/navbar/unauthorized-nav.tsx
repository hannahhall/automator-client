import NavbarLink from './navbarLink';

function UnauthorizedNav() {
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <NavbarLink href="/register" className="button is-primary">
            Register
          </NavbarLink>
          <NavbarLink href="/login" className="button is-light">Log In</NavbarLink>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedNav;
