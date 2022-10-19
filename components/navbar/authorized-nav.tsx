import NavbarLink from './navbarLink';

interface AuthorizedNavProps {
  logout: () => void;
}

function AuthorizedNav({ logout }: AuthorizedNavProps) {
  return (
    <div className="navbar-end">
      <NavbarLink href="/programs/create" className="navbar-item is-size-5">
        Create Program
      </NavbarLink>

      <div className="navbar-item">
        <div className="buttons">
          <button id="logout-button" type="button" className="button is-primary is-size-6" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthorizedNav;
