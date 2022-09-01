interface AuthorizedNavProps {
  logout: () => void;
}

function AuthorizedNav({ logout }: AuthorizedNavProps) {
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <button type="button" className="button is-primary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthorizedNav;
