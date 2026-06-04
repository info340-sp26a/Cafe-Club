import { Link } from "react-router";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" aria-label="Home">
            <img
              className="custom-icon"
              src="/img/home.svg"
              alt="home-icon"
            />
          </Link>
        </li>

        <li>
          <Link to="/menu">Create A Menu</Link>
        </li>

        <li>
          <Link to="/feedback">Feedback & Approval</Link>
        </li>

        <li className="auth-links">
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="signup-link">
                Sign Up
              </Link>

              <Link to="/login" className="login-link">
                Login
              </Link>
            </>
          ) : (
            <button
              className="logout-btn"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}