import { User } from '../../interfaces';
import NavbarLink from './navbarLink';

interface AuthorizedNavProps {
  logout: () => void;
  user: User;
}

function AuthorizedNav({ logout, user }: AuthorizedNavProps) {
  return (
    <div className="navbar-end">
      {
        user?.is_staff ? (
          <>
            <NavbarLink href="/programs/create" className="navbar-item is-size-5">
              Create Program
            </NavbarLink>

            <NavbarLink href="/cohorts/create" className="navbar-item is-size-5">
              Create Cohort
            </NavbarLink>
          </>
        ) : (
          <>
            <NavbarLink href="/edit" className="navbar-item is-size-5">
              Edit My Info
            </NavbarLink>
            <NavbarLink href="/projects/create" className="navbar-item is-size-5">
              Add Project
            </NavbarLink>
          </>
        )
      }

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
