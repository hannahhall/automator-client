import NavbarLink from './navbarLink';

function Navbar() {
  return (
    <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item title m-0">Automator</h1>

        <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarLinks">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </div>

      <div id="navbarLinks" className="navbar-menu">
        <div className="navbar-start">
          {/* Links Here */}
        </div>

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
      </div>
    </nav>
  );
}

export default Navbar;
